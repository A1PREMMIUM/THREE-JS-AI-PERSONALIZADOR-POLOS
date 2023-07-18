import React from "react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";

import config from "../config/config.js";
import state from "../store/index.js";
import { download } from "../assets/index.js";
import { downloadCanvasToImage } from "../config/helpers.js";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants.js";
import { fadeAnimation, slideAnimation } from "../config/motion.js";

import {
  AIPicker,
  ColorPicker,
  CustomButton,
  FilePicker,
  Tab,
} from "../components/";

const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState('');

  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  //show tab content dependindg om the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorPicker":
        return <colorPicker
          file={file}
          setFile={setFile}
          readFile={readFile}
        />;
      case "aiPicker":
        return <AIPicker
          prompt={prompt}
          setPrompt={setPrompt}
          generatindImg={generatingImg}
          handleSubmit={handleSubmit}
          
        />;
      case "filePicker":
        return null;
      
    }
  }
  const handleSubmit = async (type) => {
    if (!prompt) return alert("Please enter a prompt");

    try {
      // Llamar a nuestro backend para generar una imagen o texto de IA
      const response = await fetch(`localhost:8080/api/v1/dalle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          
        }),
      });
    } catch (error) {
      alert(error);
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  };

  const handleDecals = (type, result) => {
    const DecalTypes = DeacalTypes[type];

    state[DecalTypes.stateProperty] = result;

    if (!activeFilterTab[DecalTypes.filterTab]) {
      handleActiveFilterTab(DecalTypes.filterTab);

    }
  }

  const handleActiveEditorTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;

    }

    // after setting the state activeFilterTab is updated

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  };



  const readFile = (type) => {
    reader(file)
      .then((result) => {
        handleDecals(type, result);
        setActiveEditorTab("");
      })
      .catch((error) => {
        // Manejar el error si la lectura del archivo falla
      });
  };


return (
  <AnimatePresence>
    {!snap.intro && (
      <>
        <motion.div
          className="absolute top-0 left-0 z-10"
          {...slideAnimation("left")}
        >
          <div className="flex items-center min-h-screen">
            <div className="editortabs-container tabs">
              {EditorTabs.map((tab) => (
                <Tab
                  key={tab.id}
                  tab={tab}
                  handleClick={() => setActiveEditorTab(tab.name)}


                />
              ))}

              {generateTabContent()}
            </div>
          </div>
        </motion.div>


        <motion.div
          className="absolute z-10 top-5 right-5"
          {...fadeAnimation("right")}
        >
          <CustomButton
            type="filled"
            title="GoBack"
            handleClick={() => (state.intro = true)}
            customStyle="w-fit px-4 py-2.5 font-bold txt-sm"
          />
        </motion.div>



        <motion.div className="filtertabs-containers"
          {...slideAnimation("up")}
        >
          {FilterTabs.map((tab) => (
            <Tab
              key={tab.name}
              tab={tab}
              isFilterTab
              isActiveTab=""
              handleClick={() => handleActiveFilterTab(tab.name)}
            />
          ))}
        </motion.div>
      </>
    )}

  </AnimatePresence>

  );

}
export default Customizer;




