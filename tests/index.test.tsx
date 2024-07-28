import { render } from "@testing-library/react";
import FlatedReact from "../src"; // Adjust the import based on your project structure

// Mock components for testing
const MockComponentA: React.FC<
  React.PropsWithChildren<{ message: string }>
> = ({ message, children }) => (
  <div>
    A: {message}
    {children}
  </div>
);

const MockComponentB: React.FC<React.PropsWithChildren<{ count: number }>> = ({
  count,
  children,
}) => (
  <div>
    B: {count}
    {children}
  </div>
);

let componentCIndex = 0;
const MockComponentC: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div>
    C: {++componentCIndex}
    {children}
  </div>
);

describe("FlatedReact", () => {
  it("renders nested components correctly", () => {
    const { queryAllByLabelText, container } = render(
      <FlatedReact.Wrap
        components={[
          FlatedReact.Load(MockComponentA, { message: "Hello" }),
          FlatedReact.Load(MockComponentB, { count: 42 }),
          MockComponentC,
        ]}
      >
        <span>Children Content</span>
      </FlatedReact.Wrap>
    );

    expect(queryAllByLabelText("A: Hello")).toBeTruthy();
    expect(queryAllByLabelText("B: 42")).toBeTruthy();
    expect(queryAllByLabelText("C")).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it("renders components with default props", () => {
    const { queryAllByLabelText, container } = render(
      <FlatedReact.Wrap
        components={[
          FlatedReact.Load(MockComponentA, { message: "Default Message" }),
          FlatedReact.Load(MockComponentC),
        ]}
      >
        <span>Default Children</span>
      </FlatedReact.Wrap>
    );

    expect(queryAllByLabelText("A: Default Message")).toBeTruthy();
    expect(queryAllByLabelText("C")).toBeTruthy();
    expect(queryAllByLabelText("Default Children")).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it("renders without props and `FlatedReact.Load` correctly", () => {
    const { queryAllByLabelText, container } = render(
      <FlatedReact.Wrap
        components={[
          FlatedReact.Load(MockComponentC),
          [MockComponentC],
          [MockComponentC, undefined],
          [MockComponentC, null],
          [MockComponentC, {}],
        ]}
      >
        <span>No Props Children</span>
      </FlatedReact.Wrap>
    );

    expect(queryAllByLabelText("C")).toBeTruthy();
    expect(queryAllByLabelText("No Props Children")).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
