import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCardDetails } from '../../store/actions/cardActions'
import { useHistory, useParams } from 'react-router-dom'
import { BlackScreen } from '../CardDetails/BlackScreen/BlackScreen'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPencilAlt, } from '@fortawesome/free-solid-svg-icons'
import { AiOutlineArrowRight } from 'react-icons/ai'


export function CardDetails() {
    const boardState = useSelector(state => state.boardReducer)
    const tableState = useSelector(state => state.tableReducer.tables)
    const cardsState = useSelector(state => state.cardReducer.cards)
    const { boardid, cardid, } = useParams();
    const currBoard = boardState.boards[boardid]
    const [currTable, setCurrTable] = useState(null)
    const [currCard, setCurrCard] = useState()



    // const [newCardTitle, setCardTitle] = useState({ title: '' })
    const dispatch = useDispatch()
    const history = useHistory()
    // const [isCardTitleChange, onSetCardTitle] = useState(false)

    // const [isMouseOver, setMouseOver] = useState(false)



    // const pencil = <FontAwesomeIcon icon={faPencilAlt} />



    const loadCurrCard = useCallback(() => {
        const currCard = cardsState[cardid]
        setCurrCard(currCard)
    }, [cardsState, cardid])

    useEffect(() => {
        loadCurrCard()
        setCurrTable(tableState[currBoard.tableId])
    }, [currCard, loadCurrCard,currBoard.tableId,tableState])


    const onToggleCardDetails = () => {
        dispatch(toggleCardDetails(false))
        history.goBack()
    }





    // const onRemoveDate = () => {
    //     dispatch(setDueDate(currBoard, currCard, ''))
    // }



    // const onHandleChange = ({ target }) => {
    //     const key = target.name
    //     const value = target.value
    //     newCardTitle[key] = value
    //     setCardTitle((prevState) => ({
    //         ...prevState,
    //         title: value
    //     }))
    // };

    // const onChangeTitle = (ev) => {
    //     const cardTitle = newCardTitle.title
    //     ev.preventDefault()
    //     dispatch(changeCardTitle(currCard, cardTitle, currBoard))
    //     onSetCardTitle(false)
    // }




    if (!currCard) return ''
    return (
        <div className="card-details" >
            <span onClick={onToggleCardDetails} >
                <BlackScreen />
            </span>
            <div className="card-details-board ">
                <div className="main">
                    <div className="flex card-title">
                        <h1 >{currCard.title} </h1>
                        {/* {isMouseOver &&
                                <div className="edit-title-pencil">
                                    {pencil}
                                </div>
                            } */}
                    </div>
                    <div className="board-related flex align-center">
                        <p>in <AiOutlineArrowRight className="arrow" /> {currBoard.name} board</p>
                    </div>
                    <div className="left-side-details">
                        {currTable && Object.keys(currTable.columns).map((key, idx) =>
                            <div key={idx}>
                                <p>{key}</p>
                            </div>)}

                    </div>





                </div>



            </div>







        </div>


    )
}

