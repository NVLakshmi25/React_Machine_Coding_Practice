import React, { useState } from 'react'

// render list of objects

const ListObjects = ({listObjects , addNodeToList, deleteNodeFromList}) => {
    const  [isExpanded, setIsExpanded]=useState({});
  return (
    <div className='container'>
            {listObjects.map((node)=>(
                <div key={node.id} className=' main' >
                       {/* ===== ROW ===== */}
                    <div className=' main_folder'>
                         {node.isFolder &&(
                        <span className='highlight'
                        onClick={()=>setIsExpanded((prev)=>({
                            ...prev,
                            [node.id]:!prev[node.id],
                        })

                        )} >
                             {isExpanded?.[node.id] ? " -  "  :" +  "  }
                             </span>
                    )}
                   <span className="node-name">{node.name}</span> 
                   {node?.isFolder &&(
                    <span onClick={()=> addNodeToList(node.id, true )}>
                        <img src="https://pngfre.com/wp-content/uploads/Folder-1.png" alt="icon"
                        className='icon' />
                    </span>
                   )}
                    {node.isFolder && (
      <span onClick={() => addNodeToList(node.id, false)}>
        <img src="https://static.vecteezy.com/system/resources/previews/047/132/123/non_2x/document-icon-isolated-on-white-background-file-copy-icon-for-web-and-application-vector.jpg"
         alt="icon" className='icon' />
      </span>
    )}

<span onClick={() => deleteNodeFromList(node.id)}>
  <img
    src="https://cdn-icons-png.flaticon.com/256/1345/1345874.png"
    alt="icon"
    className="icon"
  />
</span>
                   
                    </div>
                   
   {/* ===== CHILDREN BELOW ===== */}
 {isExpanded?.[node.id] && node?.children && (
        <div className="main_file">
          <ListObjects
            listObjects={node.children}
            addNodeToList={addNodeToList}
            deleteNodeFromList={deleteNodeFromList}
          />
        </div>
      )}
    </div>
            ))}

        </div>
  )
}

export default ListObjects;