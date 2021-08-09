import React, { useState, useRef, useEffect } from 'react'
import styles from '../styles.less'
import {
  Select,
  Row,
  Col,
  Input,
  Spin,
  Button,
  // AutoComplete
} from 'antd'
import { connect } from 'dva'
import { AutoComplete } from 'components'
import { withI18n, Trans } from '@lingui/react'
import { isArray } from 'utils/helper'

const { Search } = Input
const { Option } = Select

function createMarkup(content) {
  return {
    __html: content,
  }
}

const Suggestion = props => {
  const { searchResults, loadingData } = props

  const node = useRef()

  const handleClick = e => {
    if (node.current.contains(e.target)) {
      // inside click
      return
    }
    // outside click
    props.onBlur()
  }

  // const handleChange = selectedValue => {
  //   onChange(selectedValue)
  //   setOpen(false)
  // }

  useEffect(() => {
    document.addEventListener('mousedown', handleClick)

    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [])

  // The active selection's index
  // const [activeSuggestion, setActiveSuggestion] = useState(0)
  // The suggestions that match the user's input
  // const [filteredSuggestions, setFilteredSuggestions] = useState([])

  const [userInput, setUserInput] = useState()
  // Event fired when the user clicks on a suggestion
  const onClick = (event, entity) => {
    // Update the user input and reset the rest of the state

    // setActiveSuggestion(0)
    // setFilteredSuggestions([])
    // setShowSuggestions(false)
    const { theCode, title } = entity
    setUserInput(theCode)
    props.onSelect(theCode, title)
  }

  const onSearch = (event, word) => {
    props.onSearchInput(word.label)
    // props.searchRef.current.value = word.label
  }

  // Event fired when the input value is changed
  const onChange = e => {
    const userInput = e.target.value

    // Filter our suggestions that don't contain the user's input
    // const filteredSuggestions = suggestions.filter(
    //   suggestion =>
    //     suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    // )

    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    // setActiveSuggestion(0)
    // setFilteredSuggestions(filteredSuggestions)
    // setShowSuggestions(true)
    // setUserInput(e.currentTarget.value)
  }

  // Event fired when the user presses a key down
  const onKeyDown = e => {
    // User pressed the enter key, update the input and close the
    // suggestions
    // if (e.keyCode === 13) {
    // setActiveSuggestion(0)
    // setShowSuggestions(false)
    // setUserInput(filteredSuggestions[activeSuggestion])
    // }
    // User pressed the up arrow, decrement the index
    // else if (e.keyCode === 38) {
    //   if (activeSuggestion === 0) {
    //     return
    //   }
    // setActiveSuggestion(activeSuggestion - 1)
    // }
    // User pressed the down arrow, increment the index
    // else if (e.keyCode === 40) {
    //   if (activeSuggestion - 1 === filteredSuggestions.length) {
    //     return
    //   }
    // setActiveSuggestion(activeSuggestion + 1)
    // }
  }

  /* #region   */
  // let suggestionsListComponent

  // if (
  //   showSuggestions
  //   // && userInput
  // ) {
  //   if (searchResult) {
  //     suggestionsListComponent = (
  //       <ul class="suggestions">
  //         {/* // {filteredSuggestions.map((suggestion, index) => {
  //         //   let className

  //         //   // Flag the active suggestion with a class
  //         //   // if (index === activeSuggestion) {
  //         //   //   className = 'suggestion-active'
  //         //   // }

  //         //   return (
  //         //     <li className={className} key={suggestion} onClick={onClick}>
  //         //       {suggestion}
  //         //     </li>
  //         //   )
  //         // })} */}
  //       </ul>
  //     )
  //   } else {
  //     suggestionsListComponent = (
  //       <div class="no-suggestions">
  //         <em>No suggestions, you're on your own!</em>
  //       </div>
  //     )
  //   }
  // }
  /* #endregion */

  return (
    <div className={styles.suggestionsContainer} data-cy={props['data-cy']}>
      <div ref={node} className="dropdown">
        {props.showSuggestions && (
          <div className={styles.suggestions}>
            {loadingData ? (
              <Row type="flex" justify="center">
                <Spin spinning />
              </Row>
            ) : (
              <div style={{ display: 'flex' }}>
                <div
                  style={{
                    display: 'block',
                    width: '30%',
                  }}
                >
                  <div style={{ position: 'sticky' }}>
                    <span className="title">
                      <Trans id="WordList" />
                    </span>
                  </div>
                  <div
                    style={{
                      overflowY: 'auto',
                      maxHeight: '240px',
                    }}
                  >
                    <ul>
                      {searchResults &&
                        isArray(searchResults.words) &&
                        searchResults.words.map((word, index) => (
                          <li
                            style={{ whiteSpace: 'normal' }}
                            key={`item_${index}`}
                            onClick={event => onSearch(event, word)}
                          >
                            <div>{word.label}</div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
                <div
                  style={{
                    display: 'block',
                    width: '70%',
                  }}
                >
                  <div style={{ position: 'sticky' }}>
                    <span className="title" style={{ position: 'sticky' }}>
                      <Trans id="Destination Entities" />
                    </span>
                  </div>
                  <div
                    style={{
                      overflowY: 'auto',
                      maxHeight: '240px',
                    }}
                  >
                    <ul>
                      {searchResults &&
                        isArray(searchResults.destinationEntities) &&
                        searchResults.destinationEntities.map(
                          (entity, index) => (
                            <li
                              style={{ whiteSpace: 'normal' }}
                              key={`item_${index}`}
                              onClick={event => onClick(event, entity)}
                            >
                              <div
                                dangerouslySetInnerHTML={createMarkup(
                                  entity.theCode + ' ' + entity.title
                                )}
                              />
                            </li>
                          )
                        )}
                    </ul>
                  </div>
                </div>
                {/* <div style={{ display: 'block', width: '20%' }}>
                  <span className="title">
                    <Trans id="Selection" />
                    {userInput}
                  </span>
                </div> */}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

const SearchInputICD = props => {
  // console.log(props)
  const [searchResult, setSearchResult] = useState('')
  const [loadingData, setLoadingData] = useState(false)
  const [userInput, setUserInput] = useState()
  // Whether or not the suggestion list is shown
  const [showSuggestions, setShowSuggestions] = useState(false)

  const [searchInput, setSearchInput] = useState()

  const handleChange = e => {
    setSearchInput(e.target.value)
  }
  // What the user has entered

  async function onSearch(value) {
    if (value === '') {
      return
    }

    setShowSuggestions(true)
    setLoadingData(true)
    return props
      .dispatch({
        type: 'app/queryICD',
        payload: {
          queryString: value,
        },
      })
      .then(response => {
        setSearchResult(response)
      })
      .catch(errorInfo => console.log(errorInfo))
      .finally(() => {
        setLoadingData(false)
      })
  }

  const onDivBlur = () => {
    setShowSuggestions(false)
  }

  const onDivFocus = () => {
    setShowSuggestions(true)
  }

  const onSelectSuggestion = (code, name) => {
    const span = document.createElement('span')
    span.innerHTML = name

    // extractTextFromHTML function болгох

    setUserInput(code)
    props.onChange({
      coding: [
        {
          system: 'http://livercenter.mn/fhir/sid/icd-11',
          code: code,
          display: span.textContent || span.innerText,
        },
      ],
    })
  }

  return (
    <div>
      <div
        className={styles.searchInputICD}
        // onBlur={() => setTimeout(() => onDivBlur())}
        onFocus={onDivFocus}
      >
        <Row>
          <Col span={12}>
            <Search
              placeholder={props.placeholder}
              onSearch={onSearch}
              enterButton
              value={searchInput}
              onChange={handleChange}
              // onKeyDown={onKeyDown}
              style={{ width: '100%' }}
            />
          </Col>
          <Col span={12}>
            <div
              style={{ fontSize: '14px', marginLeft: '8px' }}
              className="title"
            >
              {userInput && (
                <>
                  <Trans id="Selection" />
                  :&nbsp;
                  <span className="bold">{userInput}</span>
                </>
              )}
            </div>
          </Col>
        </Row>

        <Suggestion
          data-cy={props['data-cy']}
          searchResults={searchResult}
          loadingData={loadingData}
          showSuggestions={showSuggestions}
          onBlur={onDivBlur}
          onSelect={(theCode, title) => onSelectSuggestion(theCode, title)}
          onSearchInput={title => setSearchInput(title)}
        />
      </div>
    </div>
  )
}

export default connect(({ app }) => ({
  app,
}))(withI18n()(SearchInputICD))
