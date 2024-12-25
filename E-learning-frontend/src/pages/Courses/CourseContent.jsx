import React, { useState } from "react";
import { useParams } from "react-router-dom";
import coursesData from "./CourseApi";
import ListComponenet from "../../componenet/List";
import VideoGallery from "../../componenet/YoutubeVideo";

const CourseContent = () => {
  const { id } = useParams();
  const course = coursesData.find((course) => course.id === parseInt(id));

  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center">
        <p className="text-center text-gray-500 mt-6">Course not found.</p>
      </div>
    );
  }

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setSelectedSubtopic(null); // Reset subtopic when a new topic is selected
  };

  const handleSubtopicSelect = (subtopic) => {
    setSelectedSubtopic(subtopic);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 w-full">
      <div className="container mx-auto py-6 px-4 max-w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar Section */}
          <div className="lg:col-span-3 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">{course.title}</h2>
            <ListComponenet
              data={course.modules}
              onTopicSelect={handleTopicSelect}
              onSubtopicSelect={handleSubtopicSelect}
            />
          </div>
          {/* Main Content Section */}
          <div className="lg:col-span-9 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            {selectedTopic && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {selectedTopic.title}
                </h3>
                {selectedSubtopic ? (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      {selectedSubtopic.stitle}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {selectedSubtopic.content}
                    </p>
                    {/* <a
                      href={selectedSubtopic.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Watch Video
                    </a> */}
                    <VideoGallery url={selectedSubtopic.videoUrl}/>
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    Select a subtopic to view details.
                  </p>
                )}
              </div>
            )}
            {!selectedTopic && (
              <p className="text-gray-500 dark:text-gray-400">
                Select a topic to get started.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
