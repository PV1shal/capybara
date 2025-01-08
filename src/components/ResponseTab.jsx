import CodePrettier from "./codeformatter";
import PreviewInjectFrameComponent from "./PreviewInjectFrameComponent";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const ResponseTab = ({ responseData }) => {
    const selectedStyle =
        "rounded-none opacity-30 data-[state=active]:bg-transparent data-[state=active]:opacity-100 data-[state=active]:text-primary_text";
    const scrollBarStyle = "[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-500/50 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-solid [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:bg-clip-padding hover:[&::-webkit-scrollbar-thumb]:bg-gray-500/70";

    const responseBadge = (statusCode) => {
        if (statusCode === 200) {
            return (
                <Badge variant="secondary" className="bg-[#048230] text-primary_text">
                    {responseData.status}
                </Badge>
            );
        } else if (statusCode === 400) {
            return (
                <Badge variant="destructive" className="bg-[#FF0000] text-primary_text">
                    {responseData.status}
                </Badge>
            );
        }
        return null;
    };

    const calculateSize = (value) => {
        const bytes = new Blob([JSON.stringify(value)]).size;

        if (bytes === 0) return "0 Bytes";
        const units = ["Bytes", "KB", "MB", "GB", "TB"];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${units[i]}`;
    };

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {!responseData ? (
                <div className="font-bold">Response</div>
            ) : (
                <Tabs defaultValue="body" className="flex flex-col h-full">
                    <TabsList className="bg-primary_bg data-[state=active]:text-primary_text text-primary_text w-full">
                        <div className="flex flex-row justify-between w-full">
                            <div>
                                <TabsTrigger className={selectedStyle} value="body">
                                    Body
                                </TabsTrigger>
                                <TabsTrigger className={selectedStyle} value="headers">
                                    Headers
                                </TabsTrigger>
                            </div>
                            <div className="flex text-sm items-center space-x-4 mr-3">
                                {responseBadge(responseData.status)}
                                <Separator orientation="vertical" />
                                <div className="opacity-70">{calculateSize(responseData.body)}</div>
                                <Separator orientation="vertical" />
                                <div>{responseData.responseTime}</div>
                            </div>
                        </div>
                    </TabsList>
                    <TabsContent value="body" className="flex-grow overflow-hidden">
                        <Tabs defaultValue="pretty" className="flex flex-col h-full items-start">
                            <TabsList className="bg-secondary_bg">
                                <TabsTrigger value="pretty">Pretty</TabsTrigger>
                                <TabsTrigger value="raw">Raw</TabsTrigger>
                                <TabsTrigger value="preview">Preview</TabsTrigger>
                            </TabsList>
                            <TabsContent value="pretty" className={`w-full h-full overflow-auto rounded-md bg-primary_bg text-gray-100 ${scrollBarStyle}`}>
                                <CodePrettier code={responseData.body} />
                            </TabsContent>
                            <TabsContent value="raw" className={`w-full flex-grow overflow-auto ${scrollBarStyle}`}>
                                <pre className="font-mono whitespace-pre-wrap p-4">
                                    {responseData.body}
                                </pre>
                            </TabsContent>
                            <TabsContent value="preview" className="w-full flex-grow overflow-hidden">
                                <PreviewInjectFrameComponent body={responseData.body} />
                            </TabsContent>
                        </Tabs>
                    </TabsContent>
                    <TabsContent value="headers" className="flex-grow overflow-hidden">
                        <div className="h-full overflow-auto 
                            ">
                            <Table>
                                <TableHeader className="sticky top-0 bg-primary_bg z-10">
                                    <TableRow>
                                        <TableHead>Key</TableHead>
                                        <TableHead>Value</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {Object.entries(responseData.headers).map(([key, value]) => (
                                        <TableRow key={key}>
                                            <TableCell>{key}</TableCell>
                                            <TableCell>{value}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>
                </Tabs>
            )}
        </div>
    );
};

export default ResponseTab;
