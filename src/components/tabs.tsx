import "../assets/styles/tabs.scss";
import { useEffect } from "react";
import Project from "../views/project";

export default function (props) {

  function openTab(evt: any, cityName: string) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab

    if (document !== null) {
      var el = document.getElementById(cityName);
      if (el) el.style.display = "block";
      evt.currentTarget.className += " active";
    }
  }

  return (
    <>
      <div className="tab">
        {props.items.map((item: any) => {
          return (
            <button
              className="tablinks"
              onClick={(event: any) => openTab(event, item.id)}
            >
              {item.name}
            </button>
          );
        })}
      </div>

      {props.items.map((item: any) => {
        return (
          <div id={item.id} className="tabcontent">
            <h3>{item.name}</h3>
            <Project project={item} />
          </div>
        );
      })}
    </>
  );
}
