import {
  Select,
  // Modal,
  // ModalOverlay,
  // ModalContent,
  // ModalHeader,
  // ModalFooter,
  // ModalBody,
  // ModalCloseButton,
  Button,
  Input,
} from "@chakra-ui/react"; 
import Modal from "react-modal"; 
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
import { onValue, on, set, push } from "firebase/database";
import { ref as ref1 } from "firebase/database";
import { storage, database, dbref } from "./base";

const Sem3 = {
  dropdown1: [
    {
      label: "DSA Notes",
      value: "dsanotes",
    },
    {
      label: "DSA UT1 Papers",
      value: "dsaut1",
    },
    {
      label: "DSA UT2 Papers",
      value: "dsaut2",
    },
    {
      label: "DSA ESE Papers",
      value: "dsaese",
    },
  ],
  dropdown2: [
    {
      label: "SNS Notes",
      value: "snsnotes",
    },
    {
      label: "SNS UT1 Papers",
      value: "snsut1",
    },
    {
      label: "SNS UT2 Papers",
      value: "snsut2",
    },
    {
      label: "SNS ESE Papers",
      value: "snsese",
    },
  ],
  dropdown3: [
    {
      label: "Maths Notes",
      value: "mathsnotes",
    },
    {
      label: "Maths UT1 Papers",
      value: "mathsut1",
    },
    {
      label: "Maths UT2 Papers",
      value: "mathsut2",
    },
    {
      label: "Maths ESE Papers",
      value: "mathese",
    },
  ],
  dropdown4: [
    {
      label: "DCD Notes",
      value: "dcdnotes",
    },
    {
      label: "DCD UT1 Papers",
      value: "dcdut1",
    },
    {
      label: "EDC UT2 Papers",
      value: "dcdut2",
    },
    {
      label: "EDC ESE Papers",
      value: "dcdese",
    },
  ],
  dropdown5: [
    {
      label: "EDC Notes",
      value: "edcnotes",
    },
    {
      label: "EDC UT1 Papers",
      value: "edcsut1",
    },
    {
      label: "EDC UT2 Papers",
      value: "edcut2",
    },
    {
      label: "EDC ESE Papers",
      value: "edcese",
    },
  ],
};

const Sem = () => {
  const router = useRouter();
  const pid = router.query;
  const Sem = pid.Sem;
  const [selectedValues, setSelectedValues] = useState({});
  const [subjectName, setsubjectName] = useState();
  const [resType, setResType] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [pdfUpload, setpdfUpload] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [pdfMap, setPdfMap] = useState(new Map());
  const [options, setOptions] = useState(Sem3);
  const [ddData, setDdData] = useState();

  const uploadToFirebase = async () => {
    if (pdfUpload == null) return;
    const pdfRef = await ref(
      storage,
      // `${Sem}/dsa//${pdfUpload.name}`
      `${Sem}/${subjectName}/${resType}/${pdfUpload.name}`
    );
    uploadBytes(pdfRef, pdfUpload).then(() => {
      alert("File Uploaded Successfully");
    });
  };

  // Next, retrieve data from a specific node
  useEffect(() => {
    const dbRef = ref1(database, "Sem5");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setOptions(data);
        console.log(options);
      } else {
        console.log("Error Getting Data");
      }
    });
  }, []);

  const pdfListRef = ref(storage, `${Sem}/${subjectName}/${resType}/`);
  useEffect(() => {
    console.log(pdfListRef);
    return () => {
      listAll(pdfListRef).then((res) => {
        const newPdfMap = new Map();
        res.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            newPdfMap.set(item.name, url);
          });
          setPdfMap(newPdfMap);
        });
      });
    };
  }, [resType]);

  const getPdfs = () => {
    listAll(pdfListRef).then((res) => {
      const newPdfMap = new Map();
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          newPdfMap.set(item.name, url);
        });
        setPdfMap(newPdfMap);
      });
    });
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSelect = (e, dropdown) => {
    setsubjectName(dropdown.Subject);
    setResType(e.target.value);
    openModal();
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
          <div>
            {Object.keys(options).map((dropdown) => (
              <div key={dropdown}>
                <h2>{options[dropdown][0].Subject}</h2>
                <Select
                  placeholder="Select option"
                  value={dropdown.label}
                  onChange={(e) => {
                    setsubjectName(dropdown.Subject);
                    handleSelect(e, "dropdown2");
                  }}
                >
                  {options.dropdown2.map((option) => (
                    <option
                      key={option.label}
                      value={option.value}
                      onChange={(e) => {
                        setsubjectName(option.Subject);
                        setResType(option.value);
                      }}
                      onClick={getPdfs}
                      style={{ background: "black" }}
                    >
                      {option.label}
                    </option>
                  ))}
                </Select>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal isOpen={modalOpen} onRequestClose={closeModal}>
        <h2>{subjectName}</h2>
        <p>{resType}</p>
        {/* Display the data for the selected option here */}
      </Modal>
{/* 
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
      </Modal> */}
    </>
  );
};

export default Sem;
