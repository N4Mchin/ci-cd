export function loadValuesets(valuesetIds = [], valuesets = []) {
  return valuesetIds.map(id => {
    return valuesets.find(vset => vset.id === id)
  })
}

export function resolveDesignation(
  valueset = { concept: [] },
  language = 'mn'
) {
  try {
    // fhir valuesets -> compose.include[0].concept
    let system = valueset.compose.include[0].system
    let concept = valueset.compose.include[0].concept.map(item => {
      let code = item.code
      let display = item.display

      try {
        display = item.designation.find(val => val.language === language).value
      } catch (err) {}

      return {
        code,
        display,
      }
    })

    return {
      id: valueset.id,
      system: system,
      concept: concept,
    }
  } catch {
    // local valuesets
    return valueset
  }
}

export function resolveDesignationFhir(valuesetItem = {}, language = 'mn') {
  try {
    const designation = valuesetItem.designation.find(
      v => v.language === language
    )
    return designation
  } catch (errorInfo) {
    console.log("couldn't resolve valuesetItem", valuesetItem)
    return
  }
}

export function resolveDisplay(valuesetItem = {}, language = 'mn') {
  const localDesignation = resolveDesignationFhir(valuesetItem, language)

  if (localDesignation) {
    return localDesignation.value
  } else {
    let display = valuesetItem.display
    return display
  }
}
