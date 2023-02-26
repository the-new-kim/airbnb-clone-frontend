import { FaStar, FaRegHeart } from "react-icons/fa";
import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Skeleton,
  SkeletonText,
  Text,
  VStack,
} from "@chakra-ui/react";
import Room from "../components/Room";
import { useEffect } from "react";
import { getRooms } from "../api";
import { useQuery } from "@tanstack/react-query";
import { IRoomList } from "../types";

export default function Home() {
  const { isLoading, data } = useQuery<IRoomList[]>(["rooms"], getRooms);

  return (
    <Grid
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
      columnGap={4}
      rowGap={8}
      templateColumns={{
        sm: "1fr",
        md: "1fr 1fr",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
        "2xl": "repeat(5, 1fr)",
      }}
    >
      {isLoading &&
        Array.from(Array(12)).map((_, index) => (
          <Box key={index}>
            <Skeleton height={280} rounded="2xl" mb={6} />
            <SkeletonText w="80%" />
          </Box>
        ))}
      {data?.map((room, index) => (
        <Room key={index} room={room} />
      ))}
    </Grid>
  );
}
