import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import UploadVideos from "./videos/UploadVideos";
import { useParams } from "react-router-dom";
import UploadLinks from "./Links.jsx/UploadLinks";
import UploadDocs from "./Documents/UploadDocs";

const StudentAcademics = () => {
  const [activeTab, setActiveTab] = useState("videos");
  const { id } = useParams();
  const data = [
    {
      label: "Videos",
      value: "videos",
      desc: <UploadVideos id={id} />,
    },
    {
      label: "Docs",
      value: "docs",
      desc: <UploadDocs id={id} />,
    },
    {
      label: "Links",
      value: "links",
      desc: <UploadLinks id={id} />,
    },
  ];
  return (
    <>
      <section className=" p-2 sm:p-5 md:p-10 ">
        <Tabs value={activeTab}>
          <TabsHeader
            className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 max-w-sm sm:max-w-md md:max-w-xl lg:max-w-none mx-auto"
            indicatorProps={{
              className:
                "bg-transparent border-b-2 border-blue-500 shadow-none rounded-none",
            }}
          >
            {data.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                onClick={() => setActiveTab(value)}
                className={activeTab === value ? "text-blue-500" : ""}
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {data.map(({ value, desc }) => (
              <TabPanel
                key={value}
                value={value}
                className="max-w-sm sm:max-w-md md:max-w-xl lg:max-w-none mx-auto"
              >
                {desc}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </section>
      {/* Footer */}
      <div className="bg-[var(--theme-color)]">
        <h1 className="font-extrabold text-sm text-center text-white px-2 py-3">
          &#169; 2023 SMS Education | All Rights Reserved
        </h1>
      </div>
    </>
  );
};

export default StudentAcademics;
