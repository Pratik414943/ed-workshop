import {
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import axios from 'axios';
import { useState, useEffect } from "react"; 
import Navbar from "./Navbar";

const Sem = () => {
  const [selectedValues, setSelectedValues] = useState({});
  const [isOpen, setIsOpen] = useState(false); 
  // const [options, setOptions] = useState([]);
  // useEffect(() => {
  //   axios.get('/options')
  //     .then(response => setOptions(response.data))
  //     .catch(error => console.log(error));
  // }, []);

  const [options, setOptions] = useState({
    dropdown1: [
      {
        label: "DSA Notes",
        value: "dsanotes",
        pdfFile: ".../public/assets/java.pdf",
      },
      {
        label: "DSA UT1 Papers",
        value: "dsaut1",
        pdfFile: "./java.pdf",
      },
      {
        label: "DSA UT2 Papers",
        value: "dsaut2",
        pdfFile: null,
      },
      {
        label: "DSA ESE Papers",
        value: "dsaese",
        pdfFile: null,
      },
    ],
    dropdown2: [
      {
        label: "SNS Notes",
        value: "snsnotes",
        pdfFile: null,
      },
      {
        label: "SNS UT1 Papers",
        value: "snsut1",
        pdfFile: null,
      },
      {
        label: "SNS UT2 Papers",
        value: "snsut2",
        pdfFile: null,
      },
      {
        label: "SNS ESE Papers",
        value: "snsese",
        pdfFile: null,
      },
    ],
    dropdown3: [
      {
        label: "Maths Notes",
        value: "mathsnotes",
        pdfFile: null,
      },
      {
        label: "Maths UT1 Papers",
        value: "mathsut1",
        pdfFile: null,
      },
      {
        label: "Maths UT2 Papers",
        value: "mathsut2",
        pdfFile: null,
      },
      {
        label: "Maths ESE Papers",
        value: "mathese",
        pdfFile: null,
      },
    ],
    dropdown4: [
      {
        label: "DCD Notes",
        value: "dcdnotes",
        pdfFile: null,
      },
      {
        label: "DCD UT1 Papers",
        value: "dcdut1",
        pdfFile: null,
      },
      {
        label: "EDC UT2 Papers",
        value: "dcdut2",
        pdfFile: null,
      },
      {
        label: "EDC ESE Papers",
        value: "dcdese",
        pdfFile: null,
      },
    ],
    dropdown5: [
      {
        label: "EDC Notes",
        value: "edcnotes",
        pdfFile: null,
      },
      {
        label: "EDC UT1 Papers",
        value: "edcsut1",
        pdfFile: null,
      },
      {
        label: "EDC UT2 Papers",
        value: "edcut2",
        pdfFile: null,
      },
      {
        label: "EDC ESE Papers",
        value: "edcese",
        pdfFile: null,
      },
    ],
  });

  const handleSelect = (event, dropdownName) => {
    const newValue = event.target.value;
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [dropdownName]: newValue,
    }));
    setIsOpen(true);
  };

  const handleFileChange = (event, option, dropdownName) => {
    const file = event.target.files[0];
    const updatedOptions = {
      ...options,
      [dropdownName]: options[dropdownName].map((o) =>
        o.value === option.value ? { ...o, pdfFile: file } : o
      ),
    };
    setOptions(updatedOptions);
  };

  const handleFileUpload = (optionValue, file) => {
    const formData = new FormData();
    formData.append('pdf', file);
    formData.append('optionValue', optionValue);
    axios.post('localhost:5000/upload', formData)
      .then(response => {
        // update state with new option object that includes PDF file
        const updatedOptions = options.map(option => {
          if (option._id === response.data._id) {
            return response.data;
          } else {
            return option;
          }
        });
        setOptions(updatedOptions);
      })
      .catch(error => console.log(error));
  };

  const handleDownload = (filename) => {
    axios.get(`localhost:5000/pdf/${filename}`, { responseType: 'blob' })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
      })
      .catch(error => console.log(error));
  };

  const handleCloseModal = () => {
    setSelectedValues({});
    setIsOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="sem">
        {/* <div className="container">
          <img
            src="https://img.freepik.com/premium-vector/liquid-shape-background-abstract-dynamic-wallpaper-poster-banner-presentation_752732-424.jpg?w=1380"
            alt=""
          />
        </div> */}
        <div className="container-main">
          <h1>Subject Wise Resources</h1>
          <hr />
          <div className="item">
            <h3>DSA</h3>
            <Select
              placeholder="Select option"
              value={selectedValues.dropdown1}
              onChange={(e) => handleSelect(e, "dropdown1")}
            >
              {options.dropdown1.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="item">
            <h3>SNS</h3>
            <Select
              placeholder="Select option"
              value={selectedValues.dropdown2}
              onChange={(e) => handleSelect(e, "dropdown2")}
            >
              {options.dropdown2.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="item">
            <h3>Maths</h3>
            <Select
              placeholder="Select option"
              value={selectedValues.dropdown3}
              onChange={(e) => handleSelect(e, "dropdown3")}
            >
              {options.dropdown3.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="item">
            <h3>Digital Circuit Design</h3>
            <Select
              placeholder="Select option"
              value={selectedValues.dropdown4}
              onChange={(e) => handleSelect(e, "dropdown4")}
            >
              {options.dropdown4.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="item">
            <h3>Electonic Devices and Circuits</h3>
            <Select
              placeholder="Select option"
              value={selectedValues.dropdown5}
              onChange={(e) => handleSelect(e, "dropdown5")}
            >
              {options.dropdown5.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Selected Values: {JSON.stringify(selectedValues)}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {Object.entries(options).map(([dropdownName, dropdownOptions]) =>
              dropdownOptions.map((option) =>
                option.value === selectedValues[dropdownName] ? (
                  <div key={option.value}>
                    <Input
                      type="file"
                      onChange={(event) =>
                        handleFileChange(event, option, dropdownName)
                      }
                    />
                    {option.pdfFile && (
                      <Button
                        onClick={() => handleDownload(option.pdfFile)}
                        mt={4}
                        bg="tomato"
                      >
                        Download PDF
                      </Button>
                    )}
                  </div>
                ) : null
              )
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleCloseModal} mx={4}>
              Close
            </Button> 
            <Button colorScheme="blue" onClick={handleFileUpload}>
              Upload
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Sem;
