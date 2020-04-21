import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AppHeader from "./components/AppHeader.js";
import InfoBar from "./components/InfoBar.js";
import RightSide from "./components/RightSide.js";
import axios from "axios";

export function SortActivity(props) {
    let [sourceBin, setSourceBin] = useState({
        heading: null,
        description: null,
        words: []
    });

    let [firstBin, setFirstBin] = useState({
        heading: null,
        description: null,
        words: []
    });

    let [secondBin, setSecondBin] = useState({
        heading: null,
        description: null,
        words: []
    });

    let [thirdBin, setThirdBin] = useState({
        heading: null,
        description: null,
        words: []
    });

    const getBinWords = (droppableId) => {
        switch(droppableId){
            case "droppable":
                return sourceBin.words;
            case "droppable2":
                return firstBin.words;
            case "droppable3":
                return secondBin.words;
            case "droppable4":
                return thirdBin.words;
        }
    }

    let [examples, setExamples] = useState(null);
    let [instructions, setInstructions] = useState(null);
    let [noneCorrect, setNoneCorrect] = useState("");
    let [partiallyCorrect, setPartiallyCorrect] = useState("");
    let [allCorrect, setAllCorrect] = useState("");
    let [maxTriesMessage, setMaxTriesMessage] = useState("");

    let [score, setScore] = useState(0); // totoal score
    let [correctWords, setCorrectWords] = useState([]); // correct words

    const processWordsForSourceBin = (response) => {
        let words = [];
        let counter = 0;
        response.bins.forEach(bin => {
            words=words.concat(Array.from(bin.words, word => ({
                id: `item-${counter++}`,
                content: word
            })));
        });

        return {
            heading: response.srcbin.heading,
            description: response.srcbin.description,
            words: words
        };
    };

    useEffect(() => {
        async function fetchData() {
            let response = await axios.get("http://localhost:5000/getSortGame/28");
            response = JSON.parse(response.data);
            setNoneCorrect(response.noneCorrect);
            setPartiallyCorrect(response.partiallyCorrect);
            setAllCorrect(response.allCorrect);
            setMaxTriesMessage(response.maxTriesMessage);
            setInstructions(response.instructions);
            setExamples(response.example);
            
            setSourceBin(processWordsForSourceBin(response));
            setFirstBin({
                heading: response.bins[0].heading,
                description: response.bins[0].description,
                words: []
            });
            setSecondBin({
                heading: response.bins[1].heading,
                description: response.bins[1].description,
                words: []
            });

            if(response.bins.length>2){ // at most 3 bins?
                setThirdBin({
                    heading: response.bins[2].heading,
                    description: response.bins[2].description,
                    words: []
                });
            }
        }
        fetchData();
    }, []); // empty array means we only send this request once

    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    /**
     * Moves an item from one list to another list.
     */
    const move = (source, destination, droppableSource, droppableDestination) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);

        destClone.splice(droppableDestination.index, 0, removed);

        const result = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;

        return result;
    };

    const grid = 8;

    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: 'none',
        padding: grid,
        margin: `0 0 ${grid}px 0`,

        // change background colour if dragging
        background: isDragging ? 'lightgreen' : 'grey',

        // styles we need to apply on draggables
        ...draggableStyle
    });

    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? 'blue' : 'lightblue',
        padding: grid,
        width: 135
    });

    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    const onDragEnd = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const words = reorder(
                getBinWords(source.droppableId),
                source.index,
                destination.index
            );

            if(source.droppableId === 'droppable') {
                setSourceBin({
                    heading: sourceBin.heading,
                    description: sourceBin.description,
                    words: words
                });
            }else if(source.droppableId === 'droppable2') {
                setFirstBin({
                    heading: firstBin.heading,
                    description: firstBin.description,
                    words: words
                });
            }else if(source.droppableId === 'droppable3') {
                setSecondBin({
                    heading: secondBin.heading,
                    description: secondBin.description,
                    words: words
                });
            }else if(source.droppableId === 'droppable4') {
                setThirdBin({
                    heading: thirdBin.heading,
                    description: thirdBin.description,
                    words: words
                });
            }
        } else {
            const result = move(
                getBinWords(source.droppableId),
                getBinWords(destination.droppableId),
                source,
                destination
            );

            switch(source.droppableId){
                case "droppable":
                    setSourceBin({
                        heading: sourceBin.heading,
                        description: sourceBin.description,
                        words: result.droppable
                    });
                    break;
                case "droppable2":
                    setFirstBin({
                        heading: firstBin.heading,
                        description: firstBin.description,
                        words: result.droppable2
                    });
                    break;
                case "droppable3":
                    setSecondBin({
                        heading: secondBin.heading,
                        description: secondBin.description,
                        words: result.droppable3
                    });
                    break;
                case "droppable4":
                    setThirdBin({
                        heading: thirdBin.heading,
                        description: thirdBin.description,
                        words: result.droppable4
                    });
                    break;
            }

            switch(destination.droppableId){
                case "droppable":
                    setSourceBin({
                        heading: sourceBin.heading,
                        description: sourceBin.description,
                        words: result.droppable
                    });
                    break;
                case "droppable2":
                    setFirstBin({
                        heading: firstBin.heading,
                        description: firstBin.description,
                        words: result.droppable2
                    });
                    break;
                case "droppable3":
                    setSecondBin({
                        heading: secondBin.heading,
                        description: secondBin.description,
                        words: result.droppable3
                    });
                    break;
                case "droppable4":
                    setThirdBin({
                        heading: thirdBin.heading,
                        description: thirdBin.description,
                        words: result.droppable4
                    });
                    break;
            }      
        }
    };

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    return (
        <div className="Main-content-format-sort">
            <AppHeader renderGame={props.renderGame} />
            <a href="/" style={{ color: "white", marginLeft:"10px"}}>home page</a>
            <br />
            <InfoBar examples={examples} instructions={instructions} />
            <br />
            <div style={{display: "flex"}}>
                <DragDropContext onDragEnd={onDragEnd} style={{height: "80%"}}>
                    <div className="DroppableColumn">
                        <b>{sourceBin.heading}</b>
                        <p>{sourceBin.description}</p>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot.isDraggingOver)}>
                                    {sourceBin.words.map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}>
                                                    {item.content}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                    <div className="DroppableColumn">
                        <b>{firstBin.heading}</b>
                        <p>{firstBin.description}</p>
                        <Droppable droppableId="droppable2">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot.isDraggingOver)}>
                                    {firstBin.words.map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}>
                                                    {item.content}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                    <div className="DroppableColumn">
                        <b><p>{secondBin.heading}</p></b>
                        <p>{secondBin.description}</p>
                        <Droppable droppableId="droppable3">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot.isDraggingOver)}>
                                    {secondBin.words.map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}>
                                                    {item.content}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                    {thirdBin.heading!==null &&
                        <div className="DroppableColumn">
                            <b>{thirdBin.heading}</b>
                            <p>{thirdBin.description}</p>
                            <Droppable droppableId="droppable4">
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        style={getListStyle(snapshot.isDraggingOver)}>
                                        {thirdBin.words.map((item, index) => (
                                            <Draggable
                                                key={item.id}
                                                draggableId={item.id}
                                                index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}>
                                                        {item.content}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    }
                </DragDropContext>
            <RightSide score={score} correctWords={correctWords} className="RightSide" />
            </div>
            
        </div>
    );
}
