// src/components/kanban board/Kanban/KanbanDndKit.jsx
import React, { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./KanbanBoard.css";

/* Sortable card component using useSortable */
function SortableCard({ id, card }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.95 : 1,
    zIndex: isDragging ? 999 : "auto",
  };

  return (
    <div className="kanban-card" ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="card-left" style={{ background: card.color }} />
      <div className="card-content">
        <h4>{card.title}</h4>
        <p><span className="meta-key">Assigned :</span> <span className="meta-val">@{card.assigned}</span></p>
        <p><span className="meta-key">Due&nbsp;&nbsp;&nbsp;&nbsp;:</span> <span className="meta-val">{card.due}</span></p>
        <p><span className="meta-key">Priority :</span> <span className="meta-val">{card.priority}</span></p>
        {card.status && <p><span className="meta-key">Status&nbsp;:</span> <span className="meta-val">{card.status}</span></p>}
        {card.completed && <p><span className="meta-key">Completed :</span> <span className="meta-val">{card.completed}</span></p>}
      </div>
    </div>
  );
}

export default function KanbanDndKit({ filter = "All" }) {
  const defaultState = {
    columns: {
      todo: ["card-1", "card-2", "card-3"],
      inprogress: [],
      pending: ["card-4"],
      done: ["card-5"],
    },
    cards: {
      "card-1": { id: "card-1", title: "Design Landing Page", assigned: "Ayesha", due: "22 Jul 2025", priority: "High", color: "#C88BFF" },
      "card-2": { id: "card-2", title: "Create User Flow Diagram", assigned: "Nikhil", due: "24 Jul 2025", priority: "Medium", color: "#C88BFF" },
      "card-3": { id: "card-3", title: "Setup Project Repo", assigned: "Ravi", due: "21 Jul 2025", priority: "Low", color: "#C88BFF" },
      "card-4": { id: "card-4", title: "Approval for Final Design", assigned: "Nikhil", due: "Awaiting Response", priority: "High", status: "Sent to Manager", color: "#CDAA6B" },
      "card-5": { id: "card-5", title: "Research Competitor Apps", assigned: "Ayesha", due: "17 Jul 2025", priority: "Low", completed: "17 Jul 2025", color: "#49C28A" },
    },
    columnOrder: ["todo", "inprogress", "pending", "done"],
  };

  const [state, setState] = useState(() => {
    try {
      const s = localStorage.getItem("kanban-data");
      return s ? JSON.parse(s) : defaultState;
    } catch {
      return defaultState;
    }
  });

  const [activeId, setActiveId] = useState(null);
  useEffect(() => {
    localStorage.setItem("kanban-data", JSON.stringify(state));
  }, [state]);

  const sensors = useSensors(useSensor(PointerSensor));

  function findColumnByCardId(cardId) {
    return Object.keys(state.columns).find((colId) => state.columns[colId].includes(cardId));
  }

  function onDragStart(evt) {
    setActiveId(evt.active.id);
  }

  function onDragEnd(evt) {
    const { active, over } = evt;
    setActiveId(null);
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Dropped onto a column container (we set column body id to column id)
    if (state.columns[overId]) {
      const sourceCol = findColumnByCardId(activeId);
      const destCol = overId;
      if (!sourceCol) return;
      if (sourceCol === destCol) return;

      // remove from source, insert at end of destination
      const newSource = state.columns[sourceCol].filter((id) => id !== activeId);
      const newDest = [...state.columns[destCol], activeId];

      setState((prev) => ({
        ...prev,
        columns: { ...prev.columns, [sourceCol]: newSource, [destCol]: newDest },
      }));
      return;
    }

    // Dropped on another card -> reorder inside same column
    const sourceCol = findColumnByCardId(activeId);
    const targetCol = findColumnByCardId(overId);
    if (!sourceCol || sourceCol !== targetCol) return;

    const items = Array.from(state.columns[sourceCol]);
    const oldIndex = items.indexOf(activeId);
    const newIndex = items.indexOf(overId);
    if (oldIndex === -1 || newIndex === -1) return;

    const newItems = arrayMove(items, oldIndex, newIndex);
    setState((prev) => ({
      ...prev,
      columns: { ...prev.columns, [sourceCol]: newItems },
    }));
  }

  function onDragCancel() {
    setActiveId(null);
  }

  const columnTitle = (id) => {
    if (id === "todo") return "To Do";
    if (id === "inprogress") return "In Progress";
    if (id === "pending") return "Pending";
    if (id === "done") return "Task Done";
    return id;
  };

  const filteredCardIds = (colId) =>
    state.columns[colId].filter((cardId) => {
      if (!filter || filter === "All") return true;
      const c = state.cards[cardId];
      return c && c.assigned === filter;
    });

  return (
    <div className="kanban-wrapper">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragCancel={onDragCancel}
      >
        <div className="kanban-grid">
          {state.columnOrder.map((colId) => {
            const cardIds = filteredCardIds(colId);
            return (
              <div key={colId} className="kanban-column">
                <div className="column-header"><h3>{columnTitle(colId)}</h3></div>

                {/* Column body id = column id so dropping onto column appends */}
                <div className="column-body" id={colId}>
                  <SortableContext items={cardIds} strategy={rectSortingStrategy}>
                    {cardIds.map((cardId) => (
                      <SortableCard key={cardId} id={cardId} card={state.cards[cardId]} />
                    ))}
                  </SortableContext>

                  {cardIds.length === 0 && (
                    <>
                      <div className="kanban-card empty-card" aria-hidden />
                      <div className="kanban-card empty-card" aria-hidden />
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <DragOverlay>
          {activeId ? <SortableCard id={activeId} card={state.cards[activeId]} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
