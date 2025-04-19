import { useEffect, useRef, useState } from 'react'
import { useTranslation } from "react-i18next";
import '../assets/style/componentsStyle/Massage.scss'
import { AddrHandle, dateFormat } from '../utils/tool';

function App(props) {
    const { t, i18n } = useTranslation()
    const [isScrolle, setIsScrolle] = useState(true) //控制是否滚动
    const [context, setContext] = useState([]) //滚动消息
    const speed = 25 //滚动速度，值越小，滚动越快
    const warper = useRef() //对应parent的节点
    const childDomInit = useRef() //初始的消息节点
    const childDomCopy = useRef() //复制的消息节点

    useEffect(() => {
        setContext([...props.messageData, ...props.messageData, ...props.messageData, ...props.messageData])
        childDomCopy.current.innerHTML = childDomInit.current.innerHTML // 复制了一层节点，拼在原有节点后面，使得它看起来像无线滚动一样
    }, [props])

    // 开始滚动
    useEffect(() => {
        let timer
        if (isScrolle) {
            timer = setInterval(() => {
                /**
                *让消息持续的向左滚动
                 * warper.current.scrollLeft：内容向左边滚动的距离
                 * childDomInit.current.scrollWidth ：内容的长度
                 */
                warper.current.scrollLeft >= childDomInit.current.scrollWidth
                    ? (warper.current.scrollLeft = 0)
                    : warper.current.scrollLeft++
            }, speed)
        }
        return () => {
            clearTimeout(timer)
        }
    }, [isScrolle])

    // 鼠标移动，移除方法
    const hoverHandler = (flag) => setIsScrolle(flag)

    return (
        <>
            <div>
                <div className="parent" ref={warper} >
                    <div className="child" ref={childDomInit}>
                        {context.map((item, index) => (
                            <div
                                key={index}
                                onMouseOver={() => hoverHandler(false)}
                                onMouseLeave={() => hoverHandler(true)}
                                className='recordItem'
                            >
                                {/* {AddrHandle(item.userAddress)}  {t("bought")}  {item.payTokenNum} PUSD {`\u00A0\u00A0\u00A0`} */}
                                <span className='titleContent'> {item?.noticeTitle}`\u00A0\u00A0\u00A0``\u00A0\u00A0\u00A0``\u00A0\u00A0\u00A0``\u00A0\u00A0\u00A0``\u00A0\u00A0\u00A0`</span> <span className='timeContent'>{dateFormat("YYYY-mm-dd", new Date(item?.createTime))}</span>
                            </div>
                        ))}
                    </div>
                    <div className="child" ref={childDomCopy}></div>
                </div>
            </div>
        </>
    )
}

export default App