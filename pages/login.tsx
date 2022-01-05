import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import Router from "next/router";

export default function SimpleCard() {
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"IDLE" | "LOADING" | "ERROR" | "READY">(
    "IDLE"
  );

  const handleFormSubmit = async () => {
    //handle form submit
    setStatus("LOADING");

    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      });
      const { data, status } = response;
      console.log("status:", status, data);
      if (status === 200) {
        Router.push("/dashboard");
        // setStatus("IDLE");
        return;
      }
      // console.log("response:", response);
      toast({
        title: "Invalid User",
        // description: "Please check your internet connection",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      setStatus("IDLE");
    } catch (error) {
      setStatus("IDLE");

      console.log(error);
      toast({
        title: "Invalid Data",
        // description: "Please check your internet connection",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to blogging career </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            ✌️ unlock cool <Link color={"blue.400"}>feedbacks</Link>
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                isLoading={status === "LOADING"}
                onClick={handleFormSubmit}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export async function getServerSideProps(context: any) {
  console.log(context);

  return {
    props: {}, // will be passed to the page component as props
  };
}
