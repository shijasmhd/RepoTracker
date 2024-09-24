const Card = ({ data, children }) => {
  return (
    <div className="flex items-center justify-between mb-2 p-2 rounded border border-gray-500	">
      <div className="ml-2">
        <h3 className="font-bold text-primary-foreground">
          {data?.repoName?.toUpperCase()}
        </h3>
        {data?.repoOwner && (
          <p className="text-primary-foreground">{data?.repoOwner}</p>
        )}
        {data.htmlUrl && (
          <a
            href={data.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400"
          >
            {data.htmlUrl}
          </a>
        )}
      </div>
      {children}
    </div>
  );
};

export default Card;
