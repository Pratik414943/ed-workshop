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
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { onValue } from "firebase/database";
import { ref as ref1 } from "firebase/database";
import { storage, database } from "./base";

const Sem3 = {
  dropdown1: [
    {
      Subject: "Data Sturctures And Algorithms",
    },
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
      Subject: "Signal and Systems",
    },
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
      Subject: "Maths",
    },
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
      Subject: "Digital Circuit Devices",
    },
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
      Subject: "Electonic Circuit Devices",
    },
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
  const [subjectName, setsubjectName] = useState();
  const [resType, setResType] = useState();
  const [pdfUpload, setpdfUpload] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [pdfMap, setPdfMap] = useState(new Map());
  const [options, setOptions] = useState(Sem3);
  const [selectedValue, setSelectedValue] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const onOptionSelect = (value) => {
    setSelectedValue(value);
    setResType(value);
    setIsOpen(true);
  };

  const onClose = () => {
    setSelectedValue(null);
    setIsOpen(false);
  };

  const uploadToFirebase = async () => {
    if (pdfUpload == null) return;
    const pdfRef = await ref(
      storage,
      `${Sem}/${subjectName}/${resType}/${pdfUpload.name}`
    );
    uploadBytes(pdfRef, pdfUpload).then(() => {
      alert("File Uploaded Successfully");
    });
  };

  // Next, retrieve data from a specific node
  useEffect(() => {
    const dbRef = ref1(database, `${Sem}`);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setOptions(data);
      } else {
        console.log("Error Getting Data");
      }
    });
  }, [Sem]);

  const pdfListRef = ref(storage, `${Sem}/${subjectName}/${resType}/`);
  useEffect(() => {
    setIsloading(true);
    console.log(pdfListRef);
    listAll(pdfListRef).then((res) => {
      const newPdfMap = new Map();
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          newPdfMap.set(item.name, url);
        });
        setPdfMap(newPdfMap);
      });
      setIsloading(false);
    });
  }, [resType]);

  // const getPdfs = () => {
  //   console.log('PDF List:'+ pdfListRef);
  //   setIsloading(true);
  //   listAll(pdfListRef).then((res) => {
  //     const newPdfMap = new Map();
  //     res.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         newPdfMap.set(item.name, url);
  //       });
  //       setPdfMap(newPdfMap);
  //     });
  //   });
  //   setIsloading(false);
  // };

  return (
    <>
      <Navbar />
      <div className="sem">
        <div className="container-main">
          <h1>Subject Wise Resources</h1>
          <hr />
          <div className="item">
            {options &&
              Object.keys(options).map((dropdown) => (
                <div key={dropdown} className="item">
                  <h3>{options[dropdown][0].Subject}</h3>
                  <Select
                    placeholder={`Select ${options[dropdown][0].Subject}`}
                    value={selectedValue}
                    onChange={(e) => {
                      setsubjectName(options[dropdown][0].Subject);
                      onOptionSelect(e.target.value);
                    }}
                  >
                    {options[dropdown].map((option) => (
                      <option
                        key={option.label}
                        value={option.value}
                        onChange={(e) => {
                          setResType(e.target.value);
                        }}
                        // onClick={getPdfs}
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

      {selectedValue && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedValue}</ModalHeader>
            <ModalCloseButton />
            {isloading ? (
              <div className="center">
                <Spinner
                  thickness="4px"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              </div>
            ) : (
              <ModalBody>
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
              </ModalBody>
            )}
            <ModalFooter>
              <Button colorScheme="blue" onClick={onClose} mx={4}>
                Close
              </Button>
              <Button colorScheme="blue" onClick={uploadToFirebase}>
                Upload
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default Sem;
