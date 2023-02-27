import { Heading, Spinner, useToast, VStack } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { githubLogin } from "../api";

export default function GithubConfirm() {
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { search } = useLocation();

  const confirmLogin = async () => {
    const params = new URLSearchParams(search);
    const code = params.get("code");
    if (code) {
      const status = await githubLogin(code);

      console.log("STATUS::::", status);

      if (status === 200) {
        toast({
          status: "success",
          title: "Welcome!",
          position: "bottom-right",
          description: "Happy to have you back!",
        });
        queryClient.refetchQueries(["me"]);
        navigate("/");
      }
    }
  };
  useEffect(() => {
    confirmLogin();
  }, []);

  return (
    <VStack bg="gray.100" justifyContent={"center"} minH="100vh">
      <Heading>Processing...</Heading>
      <Spinner size="xl" />
    </VStack>
  );
}
