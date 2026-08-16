import { render, screen, waitFor } from "@testing-library/react";
import FlightFaresBlock from "@/components/pageBuilder/FlightFaresBlock";
import styles from "@/components/pageBuilder/pageBuilder.module.css";
import { getFlightFare } from "@/services/getData";

jest.mock("@/services/getData", () => ({ getFlightFare: jest.fn() }));

describe("FlightFaresBlock", () => {
    test("renders the legacy fare table structure and dedicated styling", async () => {
        getFlightFare.mockResolvedValue([{
            id: "delhi-dubai",
            title: "FIXED DEPARTURE - DELHI-DUBAI",
            number: 3,
            0: ["Sector", "Travel Date", "Flight No. & Time", "Seats", "Group Fare", "Baggage"],
            1: ["DEL-DXB", "02-Jul-24", "6E-1463//17:40-19:50", "7", "ON CALL", "30 Kg"],
            2: ["DEL-DXB", "04-Jul-24", "6E-1463//17:40-19:50", "9", "ON CALL", "30 Kg"]
        }]);

        render(<FlightFaresBlock block={{ heading: "Flight Fares" }} />);

        await waitFor(() => expect(screen.getByRole("table")).toBeInTheDocument());
        expect(screen.getByRole("table")).toHaveClass(styles.flightFareTable);
        expect(screen.getByText("FIXED DEPARTURE - DELHI-DUBAI")).toHaveClass(styles.flightFareTitle);
        expect(screen.getByText("Sector").closest("tr")).toHaveClass(styles.flightFareHeader);
        expect(screen.getByText("FIXED DEPARTURE - DELHI-DUBAI")).toHaveAttribute("colspan", "6");
        expect(screen.getAllByRole("row")).toHaveLength(4);
    });
});
