import {
  Flex,
  Box,
  Spacer,
  IconButton,
  Text,
  Input,
  Select,
  Switch,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import { ReactEventHandler, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { StockConfig, StockInterval } from "@/types/types";

const STOCK_INTERVALS: StockInterval[] = [
  "1d",
  "5d",
  "1wk",
  "1mo",
  "3mo",
  "6mo",
  "1y",
  "2y",
  "5y",
  "10y",
  "ytd",
];

export default function StockConfigCard({
  id,
  widget,
  configChangeHandler,
  deleteHandler,
}: {
  id: string;
  widget: StockConfig;
  configChangeHandler: any;
  deleteHandler: any;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Box ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Flex
        bg="gray.100"
        direction="row"
        alignItems="center"
        borderRadius="lg"
        borderWidth="2px"
        mb={4}
        p={5}
      >
        <Box display="flex" flexDirection="column" gap="4">
          <Box display="flex" gap="4">
            <Box>
              <Text fontSize="md">Ticker</Text>
              <Input
                placeholder={`${widget.stock}`}
                onChange={(e) => {
                  configChangeHandler(e.target.value, "stock", widget.id);
                }}
              />
            </Box>
            <Box>
              <Text fontSize="md">% Interval</Text>
              <Select
                placeholder={widget.interval}
                onChange={(e) => {
                  configChangeHandler(e.target.value, "interval", widget.id);
                }}
              >
                {STOCK_INTERVALS.map((interval) => (
                  <option key={interval} value={interval}>
                    {interval}
                  </option>
                ))}
              </Select>
            </Box>
          </Box>
          <Box display="flex" gap="4">
            <FormControl alignItems="left">
              <FormLabel htmlFor="show-open-price">Open</FormLabel>
              <Switch
                isChecked={widget.showOpen}
                size="lg"
                id="show-open-price"
                onChange={() => {
                  configChangeHandler(!widget.showOpen, "showOpen", widget.id);
                }}
              />
            </FormControl>
            <FormControl alignItems="left">
              <FormLabel htmlFor="show-close-price">Close</FormLabel>
              <Switch
                isChecked={widget.showClose}
                size="lg"
                id="show-close-price"
                onChange={() => {
                  configChangeHandler(
                    !widget.showClose,
                    "showClose",
                    widget.id
                  );
                }}
              />
            </FormControl>
            <FormControl alignItems="left">
              <FormLabel htmlFor="show-high-price">High</FormLabel>
              <Switch
                isChecked={widget.showHigh}
                size="lg"
                id="show-high-price"
                onChange={() => {
                  configChangeHandler(!widget.showHigh, "showHigh", widget.id);
                }}
              />
            </FormControl>
            <FormControl alignItems="left">
              <FormLabel htmlFor="show-low-price">Low</FormLabel>
              <Switch
                isChecked={widget.showLow}
                size="lg"
                id="show-low-price"
                onChange={() => {
                  configChangeHandler(!widget.showLow, "showLow", widget.id);
                }}
              />
            </FormControl>
            <FormControl alignItems="left">
              <FormLabel htmlFor="show-volume">Volume</FormLabel>
              <Switch
                isChecked={widget.showVolume}
                size="lg"
                id="show-volume"
                onChange={() => {
                  configChangeHandler(
                    !widget.showVolume,
                    "showVolume",
                    widget.id
                  );
                }}
              />
            </FormControl>
          </Box>
        </Box>
        <Spacer />
        <IconButton
          colorScheme="blue"
          aria-label="Delete stock"
          icon={<DeleteIcon />}
          onClick={() => {
            deleteHandler(widget.id);
          }}
        />
      </Flex>
    </Box>
  );
}
