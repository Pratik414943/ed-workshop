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
import { useRouter } from "next/router";
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

const Sem = () => {
  const router = useRouter();
  const pid = router.query;
  const Sem = pid.Sem;
  const [selectedValues, setSelectedValues] = useState({});
  const [subjectName, setsubjectName] = useState("");
  const [resType, setResType] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [pdfUpload, setpdfUpload] = useState(null);
  const [pdfMap, setPdfMap] = useState(new Map());

  const uploadToFirebase = () => {
    if (pdfUpload == null) return;
    // console.log(pdfUpload.name);
    const pdfRef = ref(
      storage,
      // `${Sem}/dsa//${pdfUpload.name}`
      `${Sem}/${subjectName}/${resType}/${pdfUpload.name}`
    );
    uploadBytes(pdfRef, pdfUpload).then(() => {
      alert("File Uploaded Successfully");
    });
  };

  // const pdfListRef = ref(storage, `Sem5/SNS/snsnotes/`);
  // const pdfListRef = ref(storage, `Sem3/dsa/`);
  const pdfListRef = ref(storage, `${Sem}/${subjectName}/${resType}`);
  // console.log(pdfListRef);
  useEffect(() => {
    listAll(pdfListRef).then((res) => {
      const newPdfMap = new Map();
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          newPdfMap.set(item.name, url);
        });
        setPdfMap(newPdfMap);
      });
    });
  }, []);

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
    setResType(event.target.value);
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
              onChange={(e) => {
                setsubjectName("dsa");
                handleSelect(e, "dropdown1");
              }}
            >
              {options.dropdown1.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  style={{ background: "black" }}
                >
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
              onChange={(e) => {
                setsubjectName("SNS");
                handleSelect(e, "dropdown2");
              }}
            >
              {options.dropdown2.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  style={{ background: "black" }}
                >
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
              onChange={(e) => {
                setsubjectName("Maths");
                handleSelect(e, "dropdown3");
              }}
            >
              {options.dropdown3.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  style={{ background: "black" }}
                >
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
              onChange={(e) => {
                setsubjectName("DCD");
                handleSelect(e, "dropdown4");
              }}
            >
              {options.dropdown4.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  style={{ background: "black" }}
                >
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
              onChange={(e) => {
                setsubjectName("EDC");
                handleSelect(e, "dropdown5");
              }}
            >
              {options.dropdown5.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  style={{ background: "black" }}
                >
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
                      onChange={(event) => {
                        setpdfUpload(event.target.files[0]);
                      }}
                    />
                    <Input placeholder="Enter PDF Name" mt={2} disabled />
                    {Array.from(pdfMap.keys()).map((name) => (
                      <div className="item-div">
                        <button className="pdf_btn">
                          <i className="fa-regular fa-file-pdf"></i>
                          <a
                            href={pdfMap.get(name)}
                            download={name}
                            target="_blank"
                          >
                            {name}
                          </a>
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
