import '../../scss/faq/_faqs.scss'

export default function FaqCard({ faqTitle, faqDescription }) {

    return <div className="faqs--container">
        <div className="faqs--container__title">
            <h2>{faqTitle}</h2>
        </div>
        <div className="faqs--container__desc">
            <p>{faqDescription}</p>
        </div>
    </div>
}