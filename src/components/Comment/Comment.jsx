const Comment = ({ comment }) => {
  return (
    <div>
      <p className="break-words p-4">
        {comment}
      </p>
      <hr />
    </div>
  );
};

export { Comment };
