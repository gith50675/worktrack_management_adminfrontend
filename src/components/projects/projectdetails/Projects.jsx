import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Projects.css"

const Projects = () => {
    // const projects=[
    //     {comapny:"WebDevelopment",status:"In progressing",time:"3Day left",progress:"60"}
    // ]
  return (
    <>
    <div className="project-container">
      <div className="project-title">
        <div className="PRoject">Projects</div>
          <NavLink to="/newproject">
            <div className='new-project-btn'>        
                <div><img className='plus-icon' src="/Add.svg" alt="" /></div>
                <div>New Project</div>
            </div>   
          </NavLink>   
      </div>
      <div className="project-filter-sort-div">
        <button className='proj-sort-filt-btn'>
          <img src="/filter icon.svg" alt="" />
          <p className='filt-sort'>Filter</p>

        </button>
        <button className='proj-sort-filt-btn'>
          <img src="sort icon.svg" alt="" />
          <p  className='filt-sort'>Sort</p>
        </button>
      </div>


      <div className="project-detail-status">
        <div className="project-Name">
          Website Redisgn <br /> <span>PixelCraft Solution</span>
        </div>
        <div className="project-Status">In Progress</div>
        <div className="project-day-left">
          <img src="/clock.svg" alt="" /> 
          <p className='day-left'>3 day left</p>
        </div>
        <div className="progress-bar-per">
          <div className="progress-container">
            <div className='progress-bar'></div>
          </div>
           <span class="progress-value">50%</span>
          
        </div>
        <div className="three-dot">
          <img src="/3 dot.svg" alt="" />
        </div>
      </div>
      
      

    </div>


    </>
  )
}

export default Projects
