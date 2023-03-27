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
import { useRouter } from 'next/router';
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import {
  getStorage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "./base";
import { v4 } from "uuid";

const Sem = () => {
  const router = useRouter();
  const [selectedValues, setSelectedValues] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [pdfUpload, setpdfUpload] = useState(null);
  const [pdfList, setpdfList] = useState([]);
  const [pdfName, setpdfName] = useState("");
  const [pdfNameList, setpdfNameList] = useState([]);

  const uploadToFirebase = () => {
    if (pdfUpload == null) return;
    const pdfRef = ref(storage, `Sem3/dsa/${pdfName}`);
    uploadBytes(pdfRef, pdfUpload).then(() => {
      alert("File Uploaded Successfully");
    });
  };

  const pdfListRef = ref(storage, "Sem3/");
  useEffect(() => {
    listAll(pdfListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setpdfList((prev) => [...prev, url]);
          setpdfNameList((prev) => [...prev, item.name]);
        });
      });
      res.items.forEach((item) => {});
    });
  }, []);
  console.log(pdfNameList); 

  const downloadPdf=()=>{
    router.push(pdfList[0])
  }

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

  const handleCloseModal = () => {
    setSelectedValues({});
    setIsOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="sem">
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
                        setpdfUpload(event.target.files[0])
                      }
                    />
                    <Input
                      placeholder="PDF Name"
                      mt={2}
                      onChange={(e) => setpdfName(e.target.value)}
                    />
                    {pdfNameList.map((item) => (
                      <div className="pdfs">
                        <button className="pdf_btn" 
                        onClick={downloadPdf}>
                          {item}
                          <i className="fa fa-file-pdf-o"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : null
              )
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleCloseModal} mx={4}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={uploadToFirebase}>
              Upload
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Sem;
