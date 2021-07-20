import React, { useEffect,} from 'react';
// import {  useSelector } from 'react-redux';
// import { DynamicDetails } from './DynamicDetails';

export function DynamicDetails({ property, value }) {
    // const state = useSelector(state => state.state)


    useEffect(() => {
        // component didMount
        return () => {
            // component willUnMount
        }
    }, [])

    const onEditCard = (selectedKey) => {
        console.log('selectedKey:', selectedKey)
        switch (selectedKey) {
            case "Group":
                console.log('Group')
                break;
            case "Tasks":
                console.log('Tasks')
                break;
            case "Contacts":
                console.log('Contacts')
                break;
            case "Owner":
                console.log('Owner')
                break;
            case "Stage":
                console.log('Stage')
                break;
            case "Priority":
                console.log('Priority')
                break;
            case "Company":
                console.log('Company')
                break;
            case "Deal Age":
                console.log('Deal_Age')
                break;
            case "Deal Value":
                console.log('Deal_Value')
                break;
            case "Forecast  Value":
                console.log('Forecast_Value')
                break;
            case "Expected Close Date":
                console.log('EX_Close')
                break;
            case "Close Date":
                console.log('Close')
                break;
            case "Actual Deal Value":
                console.log('Ac_Deal_Value')
                break;
            case "Phone":
                console.log('Phone')
                break;
            case "Location":
                console.log('Location')
                break;
            case "Creation Log":
                console.log('CR_Log')
                break;
            case "Button":
                console.log('Button')
                break;
            case "Text":
                console.log('Text')
                break;
            case "Dependent On":
                console.log('Dep_On')
                break;
            case "Status":
                console.log('Status')
                break;
            case "Timeline":
                console.log('Timeline')
                break;
            case "Files":
                console.log('Files')
                break;
     

            default:
                break;
        }
    }


    return (
        <React.Fragment>
            {property !== "id" && property !== "title" &&
                < div className="dynamic-details flex align-center space-between">
                    <p> {property}</p>  <div onClick={() => onEditCard(property)} className="value flex align-center justify-center"> <span className="dotted-border"> {value} </span></div>
                </div >
            }
        </React.Fragment >
    )



}