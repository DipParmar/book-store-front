export const Card = ({ listName, listItems }) => {
  return (
    <div className='card mb-5'>
      <h3 className='card-header'>{listName}</h3>
      <ul className='list-group'>
        {listItems.map(({ content }, index) => (
          <li key={index} className='list-group-item'>
            {content}
          </li>
        ))}
      </ul>
    </div>
  );
};
