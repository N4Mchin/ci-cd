const express = require("express")
const bodyParser = require("body-parser")
const axios = require("axios")
const config = require("../config")

//const FhirService = require("../services/fhir.service")

const router = new express.Router()
router.use(bodyParser.json())

const getFhirList = async () => {
  const axiosConfig = {
    method: "get",
    url: `${config.fhirServer}/api/Organization`,
    headers: {
      "Content-Type": "application/fhir+json",
      Accept: "application/fhir+json"
    }
  }
  // if case-sensitive
  // url: /api/fhir
  try {
    return await axios(axiosConfig)
      .then(function(response) {
        return response
      })
      .catch(err => console.log("GetFhirList error: "))
  } catch (error) {
    //console.error(error)
  }
}

const getFhir = async id => {
  const axiosConfig = {
    method: "get",
    url: `${config.fhirServer}/api/organization/${id}`,
    headers: {
      "Content-Type": "application/fhir+json",
      Accept: "application/fhir+json"
    }
  }

  try {
    return await axios(axiosConfig)
  } catch (error) {
    //console.error(error)
    return error
  }
}

const makeRequest = async (params, res) => {
  try {
    const result = await getFhirList()

    if (result && result.data && result.data.entry) {
      let processed = []

      if (params && params.get("id")) {
        result.data.entry.filter(item => {
          if (item.id.search(params.get("id")) >= 0) {
            processed.push(item)
          }
        })
      } else {
        processed = result.data.entry
      }

      // if (typeof (result.data["_doc"].entry) !== 'undefined') {
      //   return res.status(200).json({
      //     data: result.data["_doc"].entry,
      //     total: result.data["_doc"].total
      //   });
      // } else {
      //   console.log("no patient data in db")
      //   return res.status(404).send()
      // }

      if (typeof result.data.entry !== "undefined") {
        //console.log(result.data.entry)

        function compare(a, b) {
          var date1 = new Date(a.meta.lastUpdated)
          var date2 = new Date(b.meta.lastUpdated)

          if (date1.getTime() > date2.getTime()) {
            return -1
          }
          if (date1.getTime() < date2.getTime()) {
            return 1
          }
          return 0
        }

        result.data.entry.sort(compare)

        return res.status(200).json({
          data: processed,
          total: process.length
        })
      }
    } else {
      console.log("no patient data in db")
      return res.status(404).send()
    }
  } catch (err) {
    //console.log(err)
    return res.status(404).send()
  }
}

const makeRequestOne = async (req, res, id) => {
  try {
    // TODO
    // change to fineOne
    const result = await getFhir(id)
    // console.log("sending this data: ", result)
    if (typeof result !== "undefined") {
      return res.status(200).json(result.data)
    }

    return res.status(404)
  } catch (err) {
    console.log(err)
  }
}

router.get("/fhir", (req, res) => {
  console.log("fhirList request received")
  return makeRequest(req, res)
})

router.get("/fhir/:id", (req, res) => {
  return makeRequestOne(req, res, req.params.id)
  let id = req.params.id

  console.log(`\tread request received with id: ${id}`)
  //FhirService.read(id, res);
  //res.send({ status: 'SUCCESS' });

  return makeRequestOne(req, res)
})

router.post("/fhir", (req, res) => {
  //const { fhir } = req.body
  console.log("fhir POST...", req.body)

  saveResourcePromise(req.body, "POST")
    .then(() => {
      return res.status(200).json({ success: true })
    })
    .catch(error => {
      return res.status(400).json(error)
    })
  ///  FhirService.create(req.body, res)
  //res.send({ status: 'SUCCESS' });
})

function saveResourcePromise(resourceInstance, method) {
  console.log(JSON.stringify(resourceInstance))
  return new Promise(function(resolve, reject) {
    if (resourceInstance === undefined) {
      reject("empty resource instance")
    }

    let url = `/api/${resourceInstance.resourceType}`
    if (method == "PUT")
      url = `/api/${resourceInstance.resourceType}/${resourceInstance.id}`

    const vid = (resourceInstance.meta || "0").versionId || "0"

    if (resourceInstance && resourceInstance.meta) {
      delete resourceInstance.meta.lastUpdated
      resourceInstance.meta.versionId = vid.toString()
    }

    const axiosConfig = {
      baseURL: `${config.fhirServer}`,
      headers: {
        "Content-Type": "application/fhir+json",
        Accept: "application/fhir+json",
        Prefer: "return=representation",
        "If-Match": `W/${vid}`
      },
      method: method,
      url: url,
      data: resourceInstance
    }

    try {
      axios(axiosConfig)
        .then(function(apiResponse) {
          let ref = {
            reference: `${resourceInstance.resourceType}/${apiResponse.data.id}`
          }
          console.log("successful (resource)")
          resolve(ref)
        })
        .catch(err => {
          const emsg =
            (
              ((
                (err.response || "failed (resource)").data ||
                "failed (resource)"
              ).issue || "failed (resource)")[0] || "failed (resource)"
            ).diagnostics || "failed (resource)"
          console.error(err.response.data.resourceType, "*****", emsg)
          reject(emsg)
        })
    } catch (error) {
      reject(error)
    }
  })
}

router.put("/fhir/:id", (req, res) => {
  let id = req.params.id
  let body = req.body

  console.log("put request for patient..")
  //FhirService.update(id, body, res)
  //res.send***
})

router.patch("/fhir/:id", (req, res) => {
  console.log("patch request for ..")
  //  console.log(req.params);
  //console.log(req.body);

  saveResourcePromise(req.body, "PUT")
    .then(() => {
      return res.status(200).json({ success: true })
    })
    .catch(error => {
      return res.status(400).json(error)
    })

  //FhirService.patch(req.params.id, req.body, res)
})

router.delete("/fhir/:id", (req, res) => {
  console.log("delete request for patient..")
  console.log(req.params)
  console.log(req.body)
  console.log(req.headers.referer)
  //FhirService.create("Hello World!")
})

module.exports = router
