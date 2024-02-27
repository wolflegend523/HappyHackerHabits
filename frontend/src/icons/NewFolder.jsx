const NewFolder = (props) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 32 32" 
      width={18}
      height={18}
      id="add-folder"
      fill="currentColor"
      {...props}
    > 
      <path 
        d="M4,21V7A1,1,0,0,1,5,6H9.35l2.89,5.47a1,1,0,0,0,.89.53H24v3h2V9a3,3,0,0,0-3-3H11.62l-.78-1.47A1,1,0,0,0,10,4H5A3,3,0,0,0,2,7V21a3,3,0,0,0,3,3H18V22H5A1,1,0,0,1,4,21ZM23,8a1,1,0,0,1,1,1v1H13.73L12.67,8Zm7,16H26v4H24V24H20V22h4V17h2v5h4Z" 
        data-name="73  Add Folder, Add, Add Files">
      </path>
    </svg>
  );
};

export default NewFolder;
