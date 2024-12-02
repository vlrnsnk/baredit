import { Community } from "components/Community/Community";

const CommunityList = ({ communities }) => {
  return (
    <section>
      {communities.length > 0 ? (
        <ul>
          {communities.map((community, index) => (
            <li key={index}>
              <Community community={community} />
            </li>
          ))}
        </ul>
      )
      : (
        <p>
          No communities
        </p>
      )}
    </section>
  );
};

export { CommunityList };
