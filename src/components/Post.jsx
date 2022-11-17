import { Avatar } from "./avatar";
import ptbr from "date-fns/locale/pt-BR";
import { format, formatDistanceToNow } from "date-fns";
import { Comment } from "./Comment";
import styles from "./Post.module.css";
import { useState } from "react";

export function Post({ author, publishedAt, content }) {
  const [comments, setcomments] = useState(["post muito bacana ein!"]);
  const [newCommentText, setNewcommentText] = useState("");
  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    { locale: ptbr }
  );
  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptbr,
    addSuffix: true,
  });
  function handleCreateNewComment() {
    event.preventDefault();
    setcomments([...comments, newCommentText]);
    setNewcommentText("");
  }
  function handleNewCommentChange() {
    setNewcommentText(event.target.value);
  }
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((line) => {
          if (line.type === "paragraph") {
            return <p id={line.content}
            key={line.content}>{line.content}</p>;
          } else if (line.type === "link") {
            return (
              <p key={line.content}>
                <a href="" id={line.content}>
                  {line.content}
                </a>
              </p>
            );
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name="comment"
          placeholder="Deixe um comentário"
          onChange={handleNewCommentChange}
          value={newCommentText}
        />

        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => {
          return <Comment id={comment} content={comment} key={comment}/>;
        })}
      </div>
    </article>
  );
}
