import React, { Fragment, useEffect, useState } from 'react';
import { Col, Container, Nav, Pagination, Row, Alert } from 'react-bootstrap';
import { useReportEntry } from './reportEntry-hook';
import ReportHeader from './ReportHeader';
import { getReportEntry, getReportEntryPeriods } from '../service/StatusEntryService';
// import { Auth } from 'aws-amplify';
import ReportContentItem from './ReportContentItem';
import './reports.scss';
import moment from 'moment';
import {getCurrentOrg} from '../service/CommonUtils'
import Auth from '../service/congnitoAuth'


const ExistingReports = (props) => {
  const { repSearch, setRepSearch } = useReportEntry();
  const [reportContent, setReportContent] = useState();
  const [reportPeriods, setReportPeriods] = useState();
  const [showNoReportsAlert, setShowNoReportsAlert] = useState(false);
  const org = getCurrentOrg();
  let user = undefined;
  
  let last6months= [moment().format("MMM-YYYY"), moment().subtract(1, 'months').format("MMM-YYYY"),  moment().subtract(2, 'months').format("MMM-YYYY"),
                   moment().subtract(3, 'months').format("MMM-YYYY"), moment().subtract(4, 'months').format("MMM-YYYY"),  
                   moment().subtract(5, 'months').format("MMM-YYYY"), moment().subtract(6, 'months').format("MMM-YYYY")]

  const onSubmit = async () => {
    debugger;
    if (user && user.username) {
      const result = await getReportEntry(
        user.username,
        `${repSearch().startPeriod}-${repSearch().endPeriod}`
      );
      if (result) {
        const desc = JSON.parse(result);
        console.log(desc);
      }
    }
  };

  const onPeriodChange = (start, end, label) => {
    setRepSearch({
      ...repSearch(),
      startPeriod: start.format('MM/DD/YYYY'),
      endPeriod: end.format('MM/DD/YYYY'),
    });
  };

  const populateUser = async () => {
    user = await Auth.currentAuthenticatedUser(); 
  };

  useEffect(() => {
    populateUser();
  });

  useEffect(() => {
    populateUser()
    .then(() => {
      const currMonthYear = moment().format("MMM-YYYY");
      const e = document.getElementById(currMonthYear);
      e.click();   
    })
  }, []);  

  let active = 2;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

  const onClickPeriod = async (itemPk, index) => {
    const arr = [];
    const org = getCurrentOrg();
    const pk= `org=${org}#user=${user.username}`

    const desc = await getReportEntry(pk, itemPk.sk)

    if (desc) {
      for (const key in desc) {
        arr.push({
          title: key,
          value: desc[key],
        });
      }
      setReportContent(arr);
      // repHistory.forEach((e, i) => {
      //   const element = document.getElementById(`repLinkdiv-${i}`);
      //   element.className = i === index ? 'replinkdivActive' : 'replinkdiv';
      // });
    }


  };

  const onClickTopPeriod = async (item) => {
    const monthYear = moment(item)
    const myr= `${monthYear.month() + 1}/${monthYear.year()}`

    const pk = `org=${org}#user=${user.username}#myr=${myr}`

    const result = await getReportEntryPeriods(pk);
    setReportPeriods(result)
    setReportContent()
    setShowNoReportsAlert(result.length == 0);
    console.log(result)
  }

  return (
    <>
      <ReportHeader />
      <br />
      <Container>
        <h4>Reports History</h4>

        <Nav
          defaultActiveKey={last6months[0]}
          onSelect={(selectedKey) => onClickTopPeriod(selectedKey)}
          style={{ marginLeft: '-15px' }}
        >
          {last6months.map((item, index) => (
            <Nav.Item key={item}>
              <Nav.Link eventKey={item}  id={item}>{item}</Nav.Link>
            </Nav.Item>
          ))}
            <Nav.Item key="daterange">
              <Nav.Link href="/home" eventKey="link-2">Date Range</Nav.Link>
            </Nav.Item>          
        </Nav>
        <br />

        <Alert show={showNoReportsAlert} variant='info'>
          No data exists for this period
        </Alert>

        <Row sm={4} style={{ height: '100%' }}>
          <Col sm={3}>
            {reportPeriods &&
              reportPeriods.map((e, index) => (
              <Fragment key={`repLink-${index}`}>
                <div
                  id={`repLinkdiv-${index}`}
                  className="replinkdiv"
                  onClick={() => onClickPeriod(e, index)}
                >
                  {e.sk}
                </div>
                <br />
              </Fragment>
            ))}
          </Col>
          <Col sm={8}>
            <div id="reportContentHtml" className="repcontentdiv">
              {reportContent &&
                reportContent.map((e) => (
                  <ReportContentItem
                    title={e.title}
                    value={e.value}
                    {...props}
                  />
                ))}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ExistingReports;
