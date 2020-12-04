import React, { useState } from "react";
import Template from "../Components/Template/Template";

function TemplateFeed() {
    let [templates, setTemplates] = useState(
        [
            {
                templateId: 78789821,
                title: "Example document",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non pharetra augue. Aenean nec ipsum vulputate libero condimentum eleifend ac ut lacus. Etiam gravida tincidunt fringilla. Donec viverra scelerisque est non laoreet.",
                flow: [
                    {
                        name: "You",
                        current: true
                    },
                    {
                        name: "Dean's office",
                        current: false
                    }
                ],
                baseDocument: {
                    fileName: "exampleFile.docx",
                    fileId: 54394324
                }
            },
            {
                templateId: 90009431,
                title: "Important document",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                flow: [
                    {
                        name: "You",
                        current: true
                    },
                    {
                        name: "Dean's office",
                        current: false
                    }
                ],
                baseDocument: {
                    fileName: "importantFile.docx",
                    fileId: 3231141
                }
            }
        ]
    );

    return (
        <div className="container mt-5">
            {templates.map((template, index) => (
                <Template template={template} key={index} id={index} />
            ))};
        </div>
    );
}

export default TemplateFeed;