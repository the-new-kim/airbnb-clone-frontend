import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaUserNinja, FaLock, FaEnvelope, FaUserSecret } from "react-icons/fa";
import { usernameSignin } from "../api";
import { ECurrencyChoices, EGenderChoices, ELanguageChoices } from "../types";
import SocialLogin from "./SocialLogin";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IForm {
  name: string;
  email: string;
  username: string;
  password: string;
  currency: string;
  gender: string;
  language: string;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<IForm>();
  const queryClient = useQueryClient();
  const toast = useToast();

  const mutation = useMutation(usernameSignin, {
    onMutate: () => {
      console.log("mutate!");
    },
    onSuccess: () => {
      toast({
        title: "welcome back!",
        status: "success",
      });
      onClose();
      queryClient.refetchQueries(["me"]);
      reset();
    },
    onError: (error) => {
      console.log("ERRROR::::", error);
    },
  });

  const onSubmit = (validForm: IForm) => {
    console.log(validForm);
    mutation.mutate({ ...validForm });
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign up</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaUserSecret />
                  </Box>
                }
              />
              <Input
                isInvalid={!!errors.name}
                variant={"filled"}
                placeholder="Name"
                {...register("name", { required: "This field is required" })}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaEnvelope />
                  </Box>
                }
              />
              <Input
                isInvalid={!!errors.email}
                variant={"filled"}
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "This field is required",
                })}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaUserNinja />
                  </Box>
                }
              />
              <Input
                isInvalid={!!errors.username}
                variant={"filled"}
                placeholder="Username"
                {...register("username", {
                  required: "This field is required",
                })}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaLock />
                  </Box>
                }
              />
              <Input
                isInvalid={!!errors.password}
                variant={"filled"}
                placeholder="Password"
                {...register("password", {
                  required: "This field is required",
                })}
              />
            </InputGroup>
            <Select
              isInvalid={!!errors.currency}
              {...register("currency", { required: true })}
            >
              <option value="">Currency</option>
              {Object.values(ECurrencyChoices).map((value) => (
                <option key={value}>{value}</option>
              ))}
            </Select>
            <Select
              isInvalid={!!errors.gender}
              {...register("gender", { required: true })}
            >
              <option value="">Gender</option>

              {Object.values(EGenderChoices).map((value) => (
                <option key={value}>{value}</option>
              ))}
            </Select>
            <Select
              isInvalid={!!errors.language}
              {...register("language", { required: true })}
            >
              <option value="">Laguage</option>

              {Object.values(ELanguageChoices).map((value) => (
                <option key={value}>{value}</option>
              ))}
            </Select>
          </VStack>
          <Button type="submit" mt={4} colorScheme={"red"} w="100%">
            Sign up
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
