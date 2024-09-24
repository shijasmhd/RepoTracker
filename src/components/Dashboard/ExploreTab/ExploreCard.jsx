const Card = ({ data, children }) => {
  return (
    <div className="flex items-center justify-between mb-2 p-2 rounded border border-gray-500	">
      <div className="ml-2">
        <h3 className="font-bold text-primary-foreground">
          {(data?.name || data?.login)?.toUpperCase()}
        </h3>
        {data?.owner?.login && (
          <p className="text-primary-foreground">{data?.owner?.login}</p>
        )}
        {data.html_url && (
          <a
            href={data.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400"
          >
            {data.html_url}
          </a>
        )}
      </div>
      {children}
    </div>
  );
};

export default Card;
