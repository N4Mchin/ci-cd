import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import { CSVLink } from 'react-csv'
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from '@react-pdf/renderer'
import { Button, Row } from 'antd'

const RevenueRow = ({ data, revenueRow, cellBackground, color }) => (
  <View
    style={{
      flexDirection: 'row',
      marginBottom: 5,
      alignItems: 'stretch',
      width: '100%',
    }}
  >
    <Text style={{ width: '7.5%', fontSize: 8, color: color }}>
      {data.createdAt}
    </Text>
    <Text
      style={{
        width: '8%',
        fontSize: 8,
        color: color,
        textAlign: 'center',
        marginLeft: '18px',
      }}
    >
      {'Uilchluulegchiin ners'}
    </Text>
    <Text
      style={{
        width: '7.5%',
        fontSize: 8,
        color: color,
        textAlign: 'center',
        marginLeft: '18px',
      }}
    >
      {'Barcode'}
    </Text>
    <Text
      style={{ width: '7.5%', fontSize: 8, color: color, textAlign: 'center' }}
    >
      {'Shinjilgee'}
    </Text>
    <Text
      style={{ width: '7.5%', fontSize: 8, color: color, textAlign: 'center' }}
    >
      {'Emch Uzleg'}
    </Text>
    <Text
      style={{
        width: '7.5%',
        fontSize: 8,
        color: color,
        textAlign: 'right',
        marginLeft: '18px',
      }}
    >
      {'Bagajiin shinjilgee'}
    </Text>
    <Text
      style={{ width: '7.5%', fontSize: 8, color: color, textAlign: 'right' }}
    >
      {'sudalgaa'}
    </Text>
    <Text
      style={{ width: '7.5%', fontSize: 8, color: color, textAlign: 'center' }}
    >
      {'hungulult'}
    </Text>
    <Text
      style={{
        width: '7.5%',
        fontSize: 8,
        color: color,
        textAlign: 'center',
        marginLeft: '18px',
      }}
    >
      {'belen'}
    </Text>
    <Text
      style={{
        width: '7.5%',
        fontSize: 8,
        color: color,
        textAlign: 'center',
        marginLeft: '18px',
      }}
    >
      {'belen bus'}
    </Text>
    <Text
      style={{ width: '7.5%', fontSize: 8, color: color, textAlign: 'center' }}
    >
      {'emd'}
    </Text>
    <Text
      style={{ width: '7.5%', fontSize: 8, color: color, textAlign: 'center' }}
    >
      {'dotood tootsoo'}
    </Text>
    <Text
      style={{ width: '7.5%', fontSize: 8, color: color, textAlign: 'center' }}
    >
      {'niit tulbur'}
    </Text>
  </View>
)

//Table Header
let revenueTitle = {
  revenueAwardTitle: '',
  revenueAwardExpDate: 'Backlog',
  revenueAwardRevenueValue: 'Awards/Growth',
  revenueAwardCTOValue: 'Contract Activity',
  revenueAwardFYEPrevRev: 'Backlog',
  revenueAwardFYEPrevCTO: 'Next Year',
}

let revenueRows = []
let revenueRow1 = {
  revenueTitle: 'Contract Awarded in Prior Years',
  revenue_B_Begining: '812618',
  revenue_ag_YTD: '0',
  revenue_ag_BOY: '213671',
  revenue_ag_Total: '213671',
  revenue_ca_YTD: '654654',
  revenue_ca_BOY: '654654',
  revenue_ca_Total: '125555',
  revenue_b_Ending: '371635',
  revenue_ny_awards: '112',
  revenue_ny_Activity: '0',
}
let revenueRow2 = {
  revenueTitle: 'Contract Awarded YTD',
  revenue_B_Begining: '0',
  revenue_ag_YTD: '71486',
  revenue_ag_BOY: '0',
  revenue_ag_Total: '71486',
  revenue_ca_YTD: '654654',
  revenue_ca_BOY: '654654',
  revenue_ca_Total: '125555',
  revenue_b_Ending: '371635',
  revenue_ny_awards: '112',
  revenue_ny_Activity: '0',
}

let revenueTotal = {
  revenueTitle: 'Total',
  revenue_B_Begining: 0,
  revenue_ag_YTD: 0,
  revenue_ag_BOY: 0,
  revenue_ag_Total: 0,
  revenue_ca_YTD: 0,
  revenue_ca_BOY: 0,
  revenue_ca_Total: 0,
  revenue_b_Ending: 0,
  revenue_ny_awards: 0,
  revenue_ny_Activity: 0,
}

revenueRows.push(revenueRow1)
revenueRows.push(revenueRow2)

//finding out the total of the table column value

revenueRows.forEach(function(data, index) {
  revenueTotal.revenue_B_Begining += +data.revenue_B_Begining || 0
  revenueTotal.revenue_ag_YTD += +data.revenue_ag_YTD || 0
  revenueTotal.revenue_ag_BOY += +data.revenue_ag_BOY || 0
  revenueTotal.revenue_ag_Total += +data.revenue_ag_Total || 0
  revenueTotal.revenue_ca_YTD += +data.revenue_ca_YTD || 0
  revenueTotal.revenue_ca_BOY += +data.revenue_ca_BOY || 0
  revenueTotal.revenue_ca_Total += +data.revenue_ca_Total || 0
  revenueTotal.revenue_b_Ending += +data.revenue_b_Ending || 0
  revenueTotal.revenue_ny_awards += +data.revenue_ny_awards || 0
  revenueTotal.revenue_B_Begining += +data.revenue_ny_Activity || 0
})

// // Create Document Component
// const MyDocument = (props) => (

// );

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  movieContainer: {
    backgroundColor: '#f6f6f5',
    display: 'flex',
    flexDirection: 'row',
    padding: 5,
  },
  movieDetails: {
    display: 'flex',
    marginLeft: 5,
  },
  movieTitle: {
    fontSize: 15,
    marginBottom: 10,
  },
  movieOverview: {
    fontSize: 10,
  },

  image: {
    height: 200,
    width: 150,
  },
  subtitle: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: 150,
    alignItems: 'center',
    marginBottom: 12,
  },
  vote: {
    display: 'flex',
    flexDirection: 'row',
  },
  rating: {
    height: 10,
    width: 10,
  },
  vote_text: {
    fontSize: 10,
  },
  vote_pop: {
    fontSize: 10,
    padding: 2,
    backgroundColor: '#61C74F',
    color: '#fff',
  },
  vote_pop_text: {
    fontSize: 10,
    marginLeft: 4,
  },
  overviewContainer: {
    minHeight: 110,
  },
  detailsFooter: {
    display: 'flex',
    flexDirection: 'row',
  },
  lang: {
    fontSize: 8,
    fontWeight: 700,
  },
  vote_average: {
    fontSize: 8,
    marginLeft: 4,
    fontWeight: 'bold',
  },
})

const PdfDocument = props => (
  <Document>
    <Page size="A4">
      <View style={{ height: '100%', width: '100%' }}>
        <View style={{ paddingTop: '20px' }}>
          <View
            style={{
              height: '240px',
              width: '95%',
              marginRight: '-5px',
              paddingTop: '0px',
              paddingBottom: '5px',
              marginBottom: '10px',
              borderRadius: '25',
            }}
          >
            <View
              style={{
                width: '100%',
                height: '30px',
                borderRadius: 25,
                marginBottom: '5px',
                marginTop: '0px',
              }}
            >
              <Text style={{ paddingLeft: '10px', fontSize: 20 }}>Revenue</Text>
            </View>
            <View
              style={{
                alignItems: 'stretch',
                width: '95%',
                height: '210px',
                marginLeft: '8px',
              }}
            >
              <View
                style={{ flexDirection: 'row', width: '100%', height: '20px' }}
              >
                <RevenueRow
                  data={props}
                  revenueRow={revenueTitle}
                  cellBackground="#b8b6b4"
                  color="white"
                />
              </View>
              <View
                style={{ flexDirection: 'row', width: '100%', height: '28px' }}
              >
                <RevenueRow
                  data={props}
                  revenueRow={revenueRow1}
                  cellBackground="white"
                  color="black"
                />
              </View>
              <View
                style={{ flexDirection: 'row', width: '100%', height: '20px' }}
              >
                <RevenueRow
                  data={props}
                  revenueRow={revenueRow2}
                  cellBackground="white"
                  color="black"
                />
              </View>
              <View
                style={{
                  width: '104%',
                  flexDirection: 'row',
                  borderBottomWidth: 2,
                  borderBottomColor: '#112131',
                  borderBottomStyle: 'solid',
                  alignItems: 'stretch',
                }}
              ></View>
              <View
                style={{ flexDirection: 'row', width: '100%', height: '20px' }}
              >
                <RevenueRow
                  data={props}
                  revenueRow={revenueTotal}
                  cellBackground="white"
                  color="black"
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </Page>
  </Document>
)

@withI18n()
@connect(({ report, loading }) => ({ report, loading }))
class Download extends PureComponent {
  state = {
    date: 'today',
  }

  render() {
    const { report, i18n, data } = this.props

    return (
      <Row gutter={8}>
        <Button onClick={this.sendXLS}>
          <CSVLink data={report.list} filename={'report.xls'}>
            Download{' '}
            <span style={{ fontFamily: 'Helvetica Neue Bold' }}>XLS</span>
          </CSVLink>
        </Button>

        {/* <PDFDownloadLink
                    document={<MyDocument data={data}/>}
                    fileName="report.pdf"
                    style={{
                        textDecoration: "none",
                        padding: "10px",
                        color: "#4a4a4a",
                        backgroundColor: "#f2f2f2",
                        border: "1px solid #4a4a4a"
                    }}
                >
                    Download{' '}
                    <span
                        style={{ fontFamily: 'Helvetica Neue Bold' }}
                    >
                        PDF
                    </span>
                </PDFDownloadLink> */}

        <PDFDownloadLink
          document={<PdfDocument data={data} />}
          fileName="movielist.pdf"
          style={{
            textDecoration: 'none',
            padding: '10px',
            color: '#4a4a4a',
            backgroundColor: '#f2f2f2',
            border: '1px solid #4a4a4a',
            borderRadius: '4px',
            marginLeft: '20px',
          }}
        >
          Download{' '}
          <span style={{ fontFamily: 'Helvetica Neue Bold' }}>PDF</span>
        </PDFDownloadLink>
      </Row>
    )
  }
}

Download.propTypes = {
  report: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Download
