import {
  animate,
  group,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  animations: [
    trigger("divState", [
      state(
        "normal",
        style({ "background-color": "red", transform: "tranlateX(0)" })
      ),
      state(
        "highlighted",
        style({
          backgroundColor: "blue",
          transform: "translateX(100px)",
        })
      ),
      transition("normal <=> highlighted", animate(300)),
      // transition("highlighted => normal", animate(800)),
    ]),
    trigger("wildState", [
      state(
        "normal",
        style({ "background-color": "red", transform: "tranlateX(0) scale(1)" })
      ),
      state(
        "highlighted",
        style({
          backgroundColor: "blue",
          transform: "translateX(100px) scale(1)",
        })
      ),
      state(
        "shrunken",
        style({
          backgroundColor: "green",
          transform: "translateX(0px) scale(0.5)",
        })
      ),
      transition("normal => highlighted", animate(300)),
      transition("highlighted => normal", animate(800)),
      transition("shrunken <=> *", [
        style({
          backgroundColor: "orange",
        }),
        animate(
          1000,
          style({
            borderRadius: "50px",
          })
        ),
        animate(500),
      ]),
    ]),
    trigger("list1", [
      state("in", style({ opacity: 1, transform: "translateX(0)" })),
      transition("void => *", [
        style({
          opacity: 0,
          transform: "translateX(-100px)",
        }),
        animate(300),
      ]),
      transition("* => void", [
        animate(300, style({ transform: "translateX(100px)", opacity: 0 })),
      ]),
      // transition("highlighted => normal", animate(800)),
    ]),
    trigger("list2", [
      state("in", style({ opacity: 1, transform: "translateX(0)" })),
      transition("void => *", [
        animate(
          1000,
          keyframes([
            style({ transform: "translateX(-100px)", opacity: 0, offset: 0 }),
            style({
              transform: "translateX(-50px)",
              opacity: 0.5,
              offset: 0.3,
            }),
            style({ transform: "translateX(-20px)", opacity: 1, offset: 0.8 }),
            style({ transform: "translateX(0px)", opacity: 1, offset: 1 }),
          ])
        ),
      ]),
      transition("* => void", [
        group([
          animate(300, style({ backgroundColor: "red" })),
          animate(800, style({ transform: "translateX(100px)", opacity: 0 })),
        ]),
      ]),
      // transition("highlighted => normal", animate(800)),
    ]),
  ],
})
export class AppComponent {
  state = "normal";
  wildState = "normal";
  list = ["Milk", "Sugar", "Bread"];

  onAdd(item) {
    this.list.push(item);
  }

  onAnimate() {
    this.state = this.state == "highlighted" ? "normal" : "highlighted";
    this.wildState = this.wildState == "highlighted" ? "normal" : "highlighted";
  }

  onShrink() {
    this.wildState = "shrunken";
  }

  onDelete(item) {
    this.list.splice(this.list.indexOf(item), 1);
  }

  animationStarted(event: Event) {
    console.log(event);
  }

  animationEnded(event: Event) {
    console.log(event);
  }
}
