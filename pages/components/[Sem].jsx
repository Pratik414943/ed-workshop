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
import { useState } from "react";
import Navbar from "./Navbar";

const Sem = () => {
  const [selectedValues, setSelectedValues] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState({
    dropdown1: [
      {
        label: "DSA Notes",
        value: "dsanotes",
        pdfFile: '.../public/assets/java.pdf',
      },
      {
        label: "DSA UT1 Papers",
        value: "dsaut1",
        pdfFile: './java.pdf',
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

  const handleDownload = (pdfFile) => {
    // const url = URL.createObjectURL(pdfFile);
    // const link = document.createElement("a");
    // link.href =  '.../public/assets/java.pdf'; 
    // console.log(link.href); 
    // link.download = pdfFile.name;
    // document.body.appendChild(link);
    // link.click();  

    var link = document.createElement('a');
    link.href = pdfFile;
    link.download = 'file.pdf';
    link.dispatchEvent(new MouseEvent('click'));
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

            {/* <Select
              value={selectedValues.dropdown2}
              onChange={(e) => handleSelect(e, "dropdown2")}
            >
              {options.dropdown2.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select> */}

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
            <Button colorScheme="blue" onClick={handleCloseModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Sem;
