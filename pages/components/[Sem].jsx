import { Select } from "@chakra-ui/react";

const Sem = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <div className="sem">
        <Navbar />
        <img
          src="https://img.freepik.com/premium-vector/liquid-shape-background-abstract-dynamic-wallpaper-poster-banner-presentation_752732-424.jpg?w=1380"
          alt=""
        />
        <div className="container">
          <h1>Subject Wise Resources</h1>
          <hr />
          <div className="item">
            <h3>DSA</h3>
            <Select placeholder="Select option">
              <option value="option1">Notes</option>
              <option value="option2">UT1 Papers</option>
              <option value="option3">UT2 Papers</option>
              <option value="option4" onSelect={onOpen}>
                End Sem Paper
              </option>
            </Select>
          </div>
          <div className="item">
            <h3>SNS</h3>
            <Select placeholder="Select option">
              <option value="option1">Notes</option>
              <option value="option2">UT1 Papers</option>
              <option value="option3">UT2 Papers</option>
              <option value="option4">End Sem Paper</option>
            </Select>
          </div>
          <div className="item">
            <h3>Maths</h3>
            <Select placeholder="Select option">
              <option value="option1">Notes</option>
              <option value="option2">UT1 Papers</option>
              <option value="option3">UT2 Papers</option>
              <option value="option4">End Sem Paper</option>
            </Select>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Lorem count={2} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Download</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ThirdSem;
