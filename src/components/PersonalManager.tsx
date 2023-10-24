import React, {FC, useEffect} from 'react';
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {useActions, useTypeSelector} from "../hooks/redux";


interface PersonalManagerProps {
    bookmarks?: boolean
}

const PersonalManager:FC<PersonalManagerProps> = ({bookmarks}) => {
    const {user} = useTypeSelector(state => state.user),
        {openManager, nameDescriptionV, nameTodoV, nameSubTodoV, subTodoNameV, localTodoCreate, setShowTodo} = useTypeSelector(state => state.utils),
        {setOpenManager, setDescriptionTodo, setSubTodo, setNameTodo, setNameSubTodo,createTodo, showTodo, setLocalTodoCreate, setTodosinit,setData} = useActions()



    useEffect(() => {
        if(user?.todo.length ===  0) return
        setTodosinit(user?.todo, user!.name)
    }, [user?.todo])

    const setOpen = () => setOpenManager(!openManager),
        createSubTodo = () => {
        if(!subTodoNameV) return

            if(localTodoCreate.subTodo) {
                const todo = {
                    nameDescriptionV,
                    nameTodoV,
                    nameSubTodoV,
                    subTodo: [
                        ...localTodoCreate.subTodo,
                        {subTodoNameV: subTodoNameV, complete:false  }
                    ]
                }
                setLocalTodoCreate(todo)
            } else {
                const todo = {
                    nameDescriptionV,
                    nameTodoV,
                    nameSubTodoV,
                    complete: 0,
                    subTodo: [
                        {subTodoNameV: subTodoNameV,complete:false }
                    ]
                }
                setLocalTodoCreate(todo)
            }
            setSubTodo({target: {value: ''}})
        },
        createTodoF = () => {
            if( localTodoCreate == {} ||  localTodoCreate.subTodo.length === 0  ) return
            createTodo([ localTodoCreate, ...user!.todo ])
            setOpenManager(!openManager)
            setData(false, user!.data, user!.name)
        },
        handlerDeleteSubTodo = (i:number) => {
            delete localTodoCreate.subTodo[i]
            setLocalTodoCreate(localTodoCreate)
        },
        setShowF = (todo?: any) => {
            showTodo(!setShowTodo)
            todo && setLocalTodoCreate(todo)

        },
        changeComplete = (i:number) => {
        // @ts-ignore
            localTodoCreate.subTodo[i].complete = true
            localTodoCreate.complete += 1
            setLocalTodoCreate(localTodoCreate)
         },
         deleteTodo = (e:any,desc:string) => {
            e.stopPropagation()
            const newTodo = user?.todo.filter((chat: any) => chat.nameTodoV !== desc)
             createTodo(newTodo)
             setTodosinit(newTodo, user!.name)
         }
    return (
        <section className={['personal__manager', bookmarks  ? 'bookmarks-width' : ''].join(' ')}>
            <div className={`presonal__head `}>
                <p>Менаджер</p>
            </div>
            <div className="presonal__projects">
                <p>проекты <span>({user?.todo.length})</span></p>
                <div className="created__buttons-personal">
                    {user?.todo.length === 0 ? <p className="noTodosL">Добавьте новую задачу</p> : ''}
                    <div className="create__project" onClick={setOpen}>
                        <svg enableBackground="new 0 0 32 32" height="30px" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="32px" xmlns="http://www.w3.org/2000/svg" ><g><polyline fill="none" points="   649,137.999 675,137.999 675,155.999 661,155.999  " stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" /><polyline fill="none" points="   653,155.999 649,155.999 649,141.999  " stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" /><polyline fill="none" points="   661,156 653,162 653,156  " stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" /></g><g><path d="M16,30c-3.74,0-7.255-1.456-9.899-4.101C1.779,21.578,0.753,15.025,3.547,9.595C3.8,9.104,4.402,8.911,4.894,9.163   c0.491,0.252,0.685,0.855,0.432,1.347C2.931,15.165,3.81,20.781,7.515,24.485C9.781,26.752,12.794,28,16,28   c3.205,0,6.219-1.248,8.485-3.515S28,19.205,28,16c0-3.206-1.248-6.219-3.515-8.485S19.206,4,16,4   c-3.206,0-6.219,1.249-8.485,3.515c-0.391,0.391-1.023,0.391-1.414,0s-0.391-1.023,0-1.414C8.745,3.457,12.26,2,16,2   c3.74,0,7.256,1.457,9.899,4.101C28.544,8.745,30,12.26,30,16c0,3.739-1.456,7.255-4.101,9.899C23.256,28.544,19.74,30,16,30z" /></g><g><path d="M16,22c-0.552,0-1-0.447-1-1V11c0-0.552,0.448-1,1-1s1,0.448,1,1v10C17,21.553,16.552,22,16,22z" /></g><g><path d="M21,17H11c-0.552,0-1-0.448-1-1s0.448-1,1-1h10c0.553,0,1,0.448,1,1S21.553,17,21,17z" /></g></svg>
                    </div>
                </div>

            </div>

            {user?.todo.map((todo: any, i: number) => <div key={i} onClick={() => setShowF(todo)} className={`personal__project margin ${i === 0 ? 'active__project' : ''} `} >
                <div className="UI">UI</div>
                <div className="project__name">{todo.nameTodoV}</div>
                <div className="project__description-small">{todo.nameSubTodoV}</div>
                <div className="wrapper__project">
                    <div className="projects__users-tree">
                        <img width="27px" height="27px" src={user?.avatarSRC || 'https://www.meme-arsenal.com/memes/5eae5104f379baa355e031fa1ded886c.jpg'} alt="userProject" />
                    </div>
                    <div className="set__complete-project">
                        <input type="range" readOnly value={todo.complete} max={todo.subTodo.length} />
                        {todo.complete === todo.subTodo.length ? <>
                            <small className="completeTodoTitle">Закончено</small>
                            <small className="completeTodoDelete" onClick={(e:any) => deleteTodo(e, todo.nameTodoV)}>Удалить</small>
                        </> : ''}
                    </div>
                </div>
            </div>)}

            <p className="statistics__manager">Статистика</p>
            <section className={["wrapper-close", openManager ? "active-wrapper-close" : ''].join(' ')} onClick={setOpen}></section>
            <div className={`created__wrapper ${openManager ? 'actived' : ""}`}>
                <p className="close__alert" onClick={setOpen} >&#10006;</p>
                <div className={`created__form `}>
                    <p>Создайте свою задачу</p>
                    <input type="text" required onChange={setNameTodo} value={nameTodoV}  placeholder="Введите название задачи"   />
                    <input type="text" required onChange={setNameSubTodo} value={nameSubTodoV} placeholder="Введите подзаголовок задачи"   />
                    <input type="text" required onChange={setDescriptionTodo} value={nameDescriptionV} placeholder="Введите описание задачи"  />
                    <input type="text" className="textSubTodo" onChange={setSubTodo} value={subTodoNameV} placeholder="Добавьте подзадачу"   />

                    {localTodoCreate?.subTodo?.map((todo: any, i: number) => <div className="subTodoItem" key={i}>
                        {i + 1}.  <p>{todo?.subTodoNameV}</p>   <div className="completeTodo" onClick={() => handlerDeleteSubTodo(i)}>&#10006;</div>
                    </div>)}
                    {localTodoCreate == {} ? <small className="noneSubTodos">добавьте подзадачи!</small> : ''}
                    <button className="addTodo" onClick={createSubTodo}>Добавить подзадачу</button>


                    <button type='submit' onClick={createTodoF}>Сохранить</button>
                </div>

            </div>


            <section className={["wrapper-close", setShowTodo ? "active-wrapper-close" : ''].join(' ')} onClick={setShowF} ></section>
            <div className={`created__wrapper  ${setShowTodo ? 'actived' : ""}`}>
                <p className="close__alert" onClick={setShowF} >&#10006;</p>
                <div className="created__form">
                    <p className={`seeMoreTitle`}>название: {localTodoCreate.nameTodoV}</p>
                    <small className={`seeMoreSubtitle `}>подзаголовок: {localTodoCreate.nameSubTodoV}</small>
                    <p className={`seeMoreDescription  `}>описание: { localTodoCreate.nameDescriptionV}</p>
                    <small className={`seeMoreSubtitle `}>Задачи</small>
                    {localTodoCreate?.subTodo?.map((todo: any, i: number) => <div className="subTodoItem" key={i}>
                        {i + 1}.  <p className={todo.complete ? 'lineTodoComplete wrapperTitle' : 'wrapperTitle'}>{todo.subTodoNameV}</p> {todo.complete ? '' : <input type="checkbox" onClick={() => {
                        setData(true, user!.data, user!.name)
                        changeComplete(i)
                    }  }  className="completeTodo checkbox" />}
                    </div>)}
                    <button type='submit' onClick={setShowF}>Сохранить</button>
                </div>

            </div>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={user?.data}
                   >


                <CartesianGrid strokeDasharray="2 2" />


                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="completed" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="ongoing" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </section >
    )
}
export default PersonalManager