import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ParamsTable from "./ParamsTable";
import BodyTable from "./BodyTable";
import { invoke } from "@tauri-apps/api/core";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ResponseTab from "./ResponseTab";

const HTTP_METHODS = [
  { value: "GET", label: "GET", color: "#00FF9F" },
  { value: "POST", label: "POST", color: "#FFB21C" },
  { value: "PUT", label: "PUT", color: "#00B1FF" },
  { value: "PATCH", label: "PATCH", color: "#9B6EFF" },
  { value: "DELETE", label: "DELETE", color: "#FF467E" },
  { value: "HEAD", label: "HEAD", color: "#00E5FF" },
  { value: "OPTIONS", label: "OPTIONS", color: "#FF9BB3" },
];

const RequestPanel = () => {
  const [open, setOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(HTTP_METHODS[0].value);
  const [URL, setURL] = useState("");

  const [paramsData, setParamsData] = useState({
    0: { key: "", value: "", description: "", isIncluded: true },
  });
  const [headersData, setHeadersData] = useState({
    0: { key: "", value: "", description: "", isIncluded: true },
  });
  const [bodyData, setBodyData] = useState({
    0: { key: "", value: "", description: "", isIncluded: true },
  });
  const [httpResponse, setHttpResponse] = useState(null);

  const getFormattedData = () => {
    const validParams = Object.values(paramsData)
      .filter((row) => row.key && row.value && row.isIncluded)
      .reduce((acc, row) => ({ ...acc, [row.key]: row.value }), {});

    const validHeaders = Object.values(headersData)
      .filter((row) => row.key && row.value && row.isIncluded)
      .reduce((acc, row) => ({ ...acc, [row.key]: row.value }), {});

    const validBody = Object.values(bodyData)
      .filter((row) => row.key && row.value && row.isIncluded)
      .reduce((acc, row) => ({ ...acc, [row.key]: row.value }), {});

    return { params: validParams, headers: validHeaders, body: validBody };
  };

  const handleSend = () => {
    const { params, headers, body } = getFormattedData();
    // Use the formatted data for API call

    invoke("send_request", {
      methodType: selectedMethod,
      url: URL,
      paramsData: JSON.stringify(params),
      headersData: JSON.stringify(headers),
      bodyData: JSON.stringify(body),
    })
      .then((resp) => {
        setHttpResponse(resp);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const getCurrentColor = () => {
    return (
      HTTP_METHODS.find((method) => method.value === selectedMethod)?.color ||
      "#00FF9F"
    );
  };

  const onChangeURL = (event) => {
    setURL(event.target.value);
  };

  useEffect(() => {
    let baseUrl = URL.split("?")[0];
    const validParams = Object.values(paramsData)
      .filter((row) => row.key && row.value && row.isIncluded)
      .map(
        (row) =>
          `${encodeURIComponent(row.key)}=${encodeURIComponent(row.value)}`
      );
    if (validParams.length > 0) {
      baseUrl += "?" + validParams.join("&");
    }
    setURL(baseUrl);
  }, [paramsData]);

  return (
    <PanelGroup direction="vertical">
      <Panel>
        <div>
          <b style={{ color: getCurrentColor() }}>{selectedMethod}</b>{" "}
          Collection 1 / API NAME
        </div>
        <div className="flex flex-row items-center">
          <div className="flex flex-row border-[2px] rounded-lg m-2 border-primary_border w-full">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[120px] justify-between bg-transparent hover:bg-[#3a3a3a] p-2 font-medium"
                  style={{ color: getCurrentColor() }}
                >
                  {selectedMethod}
                  <ChevronsUpDown className="h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[120px] p-0 bg-[#1c1c1c] border-primary_border">
                <Command className="bg-transparent">
                  <CommandList>
                    <CommandGroup>
                      {HTTP_METHODS.map((method) => (
                        <CommandItem
                          key={method.value}
                          onSelect={() => {
                            setSelectedMethod(method.value);
                            setOpen(false);
                          }}
                          className="cursor-pointer data-[selected=true]:bg-primary_select hover:bg-primary_select data-[selected=true]:hover:bg-primary_select px-2 py-1.5"
                          style={{ color: method.color }}
                        >
                          {method.label}
                          <Check
                            className={cn(
                              "ml-auto h-4 w-4",
                              selectedMethod === method.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                            style={{ color: method.color }}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <Input
              className="border-0 flex-1"
              value={URL}
              onChange={onChangeURL}
              placeholder="Enter URL"
            />
          </div>
          <Button
            className="bg-primary_button mr-3 hover:bg-[#0a474f]"
            onClick={handleSend}
          >
            SEND
          </Button>
        </div>
        <div className="h-full overflow-auto scrollbar">
          <Tabs defaultValue="params" className="w-full">
            <TabsList className="bg-transparent border-b border-primary_border">
              <TabsTrigger
                value="params"
                className="data-[state=active]:text-primary_text data-[state=active]:bg-primary_select rounded-none"
              >
                Params
              </TabsTrigger>
              <TabsTrigger
                value="headers"
                className="data-[state=active]:text-primary_text data-[state=active]:bg-primary_select rounded-none"
              >
                Headers
              </TabsTrigger>
              <TabsTrigger
                value="body"
                className="data-[state=active]:text-primary_text data-[state=active]:bg-primary_select rounded-none"
              >
                Body
              </TabsTrigger>
            </TabsList>

            <TabsContent value="params" className="mt-4">
              <ParamsTable rowsData={paramsData} setRowsData={setParamsData} />
            </TabsContent>

            <TabsContent value="headers" className="mt-4">
              <ParamsTable
                rowsData={headersData}
                setRowsData={setHeadersData}
              />
            </TabsContent>

            <TabsContent value="body" className="mt-4">
              <BodyTable rowsData={bodyData} setRowsData={setBodyData} />
            </TabsContent>
          </Tabs>
        </div>
      </Panel>
      <PanelResizeHandle className=" h-2 bg-secondary_bg" />
      <Panel>
        <ResponseTab responseData={httpResponse} />
      </Panel>
    </PanelGroup>
  );
};

export default RequestPanel;
