import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmailScheduling = () => {
  const [templates, setTemplates] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [manualEmail, setManualEmail] = useState('');
  const [csvFile, setCsvFile] = useState(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [selectedRecipientOption, setSelectedRecipientOption] = useState('');
  const [selectedSubscriber, setSelectedSubscriber] = useState('');
  const [subject, setSubject] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTemplatesAndRecipients = async () => {
      try {
        const templatesResponse = await axios.get('http://localhost:5000/api/templates');
        const recipientsResponse = await axios.get('http://localhost:5040/api/getsubscribe');
        setTemplates(templatesResponse.data);
        setRecipients(recipientsResponse.data);
      } catch (error) {
        console.error('There was an error fetching templates or recipients!', error);
      }
    };

    fetchTemplatesAndRecipients();
  }, []);

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleSendEmail = async () => {
    let recipient;
    if (!selectedTemplateId || !selectedRecipientOption || !subject) {
      setError('Please fill all the fields');
      return;
    }

    if (selectedRecipientOption === 'csv' && csvFile) {
      // Handle CSV file upload and send email
      console.log('CSV file selected:', csvFile);
    } else if (selectedRecipientOption === 'manual' && manualEmail) {
      // Handle sending email to manually entered address
      recipient = manualEmail;
      console.log('Manual email entered:', manualEmail);
    } else if (selectedRecipientOption === 'subscriber' && selectedSubscriber) {
      // Handle sending email to selected subscriber from the list
      recipient = selectedSubscriber;
      console.log('Selected recipient from list:', selectedSubscriber);
    } else {
      console.log('No recipient selected');
    }

    if (recipient) {
      try {
        await axios.post('http://localhost:5000/api/sendNow', {
          recipient,
          subject,
          templateId: selectedTemplateId,
        });
        alert('Email sent successfully');
        setSubject('');
        setSelectedTemplateId('');
        setSelectedRecipientOption('');
        setManualEmail('');
        setSelectedSubscriber('');
        setError('');
      } catch (error) {
        console.error('There was an error sending the email!', error);
        alert('There was an error sending the email!');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Email Scheduler</h1>
      <form className="mb-8 p-4 border rounded shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Select Template:</label>
          <select
            value={selectedTemplateId}
            onChange={(e) => setSelectedTemplateId(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a template</option>
            {templates.map((template) => (
              <option key={template._id} value={template._id}>
                {template.templateName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Select Recipient Option:</label>
          <select
            value={selectedRecipientOption}
            onChange={(e) => setSelectedRecipientOption(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a recipient option</option>
            <option value="subscriber">Select from Subscribers</option>
            <option value="csv">Select from CSV</option>
            <option value="manual">Add manually</option>
          </select>
        </div>

        {selectedRecipientOption === 'subscriber' && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Select Subscriber:</label>
            <select
              value={selectedSubscriber}
              onChange={(e) => setSelectedSubscriber(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select a subscriber</option>
              {recipients.map((recipient) => (
                <option key={recipient._id} value={recipient.email}>
                  {recipient.email}
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedRecipientOption === 'csv' && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Upload CSV:</label>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        )}

        {selectedRecipientOption === 'manual' && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Enter Email Manually:</label>
            <input
              type="email"
              value={manualEmail}
              onChange={(e) => setManualEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        )}
        <button
          type="button"
          onClick={handleSendEmail}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Send Now
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default EmailScheduling;
