import axios from 'axios'
import { useEffect, useState } from 'react'



export default function News() {

    const [news, setNews] = useState([])

    useEffect(() => {
        const newsAPI = import.meta.env.VITE_NEWS_API_KEY
        console.log(newsAPI)
        async function getNews() {
            const news = await axios.get(`https://newsapi.org/v2/everything?q=agriculture&apiKey=${newsAPI}`)
            setNews(news.data.articles)
            console.log(news.data.articles)
        }
        getNews()
    }, [])

    const defaulImage = 'https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg'

    return (


        <ul role="list" className="divide-y divide-gray-100">
            {news.map((each: any, index: number) => (
                <li key={index} id={`item-${index}`} className="flex justify-between gap-x-6 py-5">
                    <a href={each.url} className="flex gap-x-4">
                        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={each.urlToImage || defaulImage} alt="" />
                        <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">{each.title}</p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500"> {each.author ? each.author : 'anon'}</p>
                        </div>
                    </a>
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">{each.author}</p>
                        {each.lastSeen ? (
                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                Last seen <time dateTime={each.lastSeenDateTime}>{each.lastSeen}</time>
                            </p>
                        ) : (
                            <div className="mt-1 flex items-center gap-x-1.5">
                            </div>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    )
}