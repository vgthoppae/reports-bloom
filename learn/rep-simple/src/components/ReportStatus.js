import React, { useEffect, useState } from 'react';
import { Form, Radio, Button, DatePicker, Input, message } from 'antd';
import moment from 'moment';
import protectedRoute from './protectedRoute';
import { useLocation } from 'react-router-dom';
import {
  fetchStatusEntries,
  addStatusEntry,
} from '../service/StatusEntryService';
import WithMenu from './WithMenu';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 12,
    align: 'left',
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 6,
  },
};

const dateFormat = 'DD-MMM-YYYY';

const ReportStatus = ({
  user,
  reportStatusFormFieldsValue,
  setReportStatusFormFieldsValue,
}) => {
  console.log('rendering ReportStatus now');

  let location = useLocation();
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState(undefined);
  const username = user ? user.username : undefined;

  useEffect(() => {
    console.log(`location is ${location.pathname}`);
  }, [location]);

  const showErrorMessage = () => {
    message.error(`${errorMessage}`);
  };

  async function onFinish(vals) {
    try {
      const {
        period,
        tasksCompleted,
        keyDeliverables,
        workPlannedNextPeriod,
        scheduledTimeOff,
      } = vals;
      if (
        tasksCompleted ||
        keyDeliverables ||
        workPlannedNextPeriod ||
        scheduledTimeOff
      ) {
        const reportPeriod =
          `${period[0].format('MM/DD/YYYY')}` +
          '-' +
          `${period[1].format('MM/DD/YYYY')}`;

        const entry = {
          period: reportPeriod,
          userId: username,
          description: tasksCompleted,
        };

        await addStatusEntry(entry);

        const entries = await fetchStatusEntries();
        console.log(entries);
      } else {
        setErrorMessage(`Please enter some status to save the report`);
      }
      // alert(`${period[0].format('MM/DD/YYYY')}-${tasksCompleted}`);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (reportStatusFormFieldsValue)
      form.setFieldsValue(reportStatusFormFieldsValue);
    return () => {
      setReportStatusFormFieldsValue(form.getFieldsValue());
    };
  }, [reportStatusFormFieldsValue, form]);

  const onFinishFailed = (errorInfo) => {
    console.log('Report Status Failure:', errorInfo);
  };

  const weekChange = (e) => {
    console.log('week changed');
    console.log(e.target.value);
    if (e.target.value === 'true') {
      const period = getCurrentWeekPeriod();
      form.setFieldsValue({ period: period });
    } else {
      form.setFieldsValue({ period: null });
    }
  };

  const getCurrentWeekPeriod = () => {
    const currentWeekMondayMoment = moment().startOf('isoweek');
    const currentWeekSundayMoment = moment().endOf('isoweek');
    return [currentWeekMondayMoment, currentWeekSundayMoment];
  };

  return (
    <>
      <div>{errorMessage && showErrorMessage()}</div>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
          period: getCurrentWeekPeriod(),
          currentWeek: 'true',
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
      >
        <Form.Item label="Current Week?" name="currentWeek" required>
          <Radio.Group onChange={weekChange}>
            <Radio value="true">Yes</Radio>
            <Radio value="false">No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Select the Period"
          name="period"
          rules={[
            {
              required: true,
              message: 'Please input the date range!',
            },
          ]}
        >
          <RangePicker format={dateFormat} />
        </Form.Item>

        <Form.Item label="Tasks Completed" name="tasksCompleted">
          <TextArea rows={10} />
        </Form.Item>

        <Form.Item label="Key Deliverables" name="keyDeliverables">
          <TextArea rows={3} />
        </Form.Item>

        <Form.Item
          label="Work Planned For Next Period"
          name="workPlannedNextPeriod"
        >
          <TextArea rows={3} />
        </Form.Item>

        <Form.Item label="Scheduled Time Off" name="scheduledTimeOff">
          <TextArea rows={3} />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default protectedRoute(WithMenu(ReportStatus));
