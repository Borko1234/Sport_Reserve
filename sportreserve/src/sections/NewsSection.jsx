import { Link } from "react-router-dom";

const articles = [
  {
    id: 1,
    image: "/Food.jpg",
    date: "17.02.2025",
    title: "Хранителен режим за забързано ежедневие",
    link: "",
  },
  {
    id: 2,
    image: "/Psychology.jpg",
    date: "17.02.2025",
    title: "Спортна психология и мотивация",
    link: "",
  },
  {
    id: 3,
    image: "/Recovery.jpg",
    date: "17.02.2025",
    title: "Възстановяване след тренировка",
    link: "",
  },
];

function ArticlesSection() {
  return (
    <div className="py-10 bg-[#53565A] text-white flex flex-col items-center">
      <h2 className="text-3xl md:text font-bold text-center mb-7">Новини и статии</h2>
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-10 px-4">
        {articles.map((article) => (
          <div key={article.id}>
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-48 object-cover rounded-xl"/>
            <div className="p-4 text-left">
              <p className="text-gray-400 text-sm">{article.date}</p>
              <h3 className="text-lg font-medium mt-1">{article.title}</h3>
              <Link
                to={article.link}
                className="mt-3 inline-block bg-orange-500 text-white font-medium px-4 py-2 rounded-lg hover:bg-orange-700 transition duration-300">
                Прочети още
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArticlesSection;
