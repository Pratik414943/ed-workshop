import { Card, CardHeader, CardBody, CardFooter,SimpleGrid, Center } from '@chakra-ui/react'
import { Heading, Text, Button} from '@chakra-ui/react'

const Features = () => {
  return (
    <>
      <SimpleGrid
        spacing={'32'}  
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        <Card>
          <CardHeader>
            <Heading color={'orange'} textAlign={'left'} size="md"> Chat</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              View a summary of all your customers over the last month.
            </Text>
          </CardBody>
          <CardFooter>
            <Button bg={'black'}>Explore</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading color={'orange'} textAlign={'left'} size="md"> Anonymous Feed</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              View a summary of all your customers over the last month.
            </Text>
          </CardBody>
          <CardFooter>
            <Button bg={'black'}>Explore</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading color={'orange'} textAlign={'left'} size="md"> Free Resources</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              View a summary of all your customers over the last month.
            </Text>
          </CardBody>
          <CardFooter>
            <Button bg={'black'}>Explore</Button>
          </CardFooter>
        </Card>
      </SimpleGrid>
    </>
  );
};

export default Features;
