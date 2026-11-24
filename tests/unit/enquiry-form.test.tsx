import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EnquiryForm } from "@/components/sections/enquiry-form";
import { home } from "@/content/home";

const { fields, errors, submit, notConnected } = home.contact.form;

describe("EnquiryForm", () => {
  it("explains every missing required field when submitted empty", async () => {
    const user = userEvent.setup();
    render(<EnquiryForm />);

    await user.click(screen.getByRole("button", { name: submit }));

    expect(screen.getByText(errors.name)).toBeInTheDocument();
    expect(screen.getByText(errors.email)).toBeInTheDocument();
    expect(screen.getByText(errors.message)).toBeInTheDocument();
    expect(screen.getByLabelText(fields.name.label)).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText(fields.name.label)).toHaveFocus();
  });

  it("rejects a malformed email address", async () => {
    const user = userEvent.setup();
    render(<EnquiryForm />);

    await user.type(screen.getByLabelText(fields.name.label), "Mariam Al Mansoori");
    await user.type(screen.getByLabelText(fields.email.label), "mariam@");
    await user.type(screen.getByLabelText(fields.message.label), "Villa estate in Al Ain, concept stage.");
    await user.click(screen.getByRole("button", { name: submit }));

    expect(screen.getByText(errors.email)).toBeInTheDocument();
    expect(screen.queryByText(errors.name)).not.toBeInTheDocument();
  });

  it("states plainly that online enquiries are not connected yet when the form is valid", async () => {
    const user = userEvent.setup();
    render(<EnquiryForm />);

    await user.type(screen.getByLabelText(fields.name.label), "Mariam Al Mansoori");
    await user.type(screen.getByLabelText(fields.email.label), "mariam@example.ae");
    await user.type(screen.getByLabelText(fields.message.label), "Villa estate in Al Ain, concept stage.");
    await user.click(screen.getByRole("button", { name: submit }));

    expect(screen.getByRole("status")).toHaveTextContent(notConnected);
  });
});
