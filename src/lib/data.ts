import { type Participant } from "@/lib/types";
import { formatPhone } from "@/lib/utils";
import { faker } from "@faker-js/faker";

function createParticipant(): Participant {
  const gender = faker.person.sexType();
  const firstName = faker.person.firstName(gender);
  const lastName = faker.person.lastName();
  const email = faker.internet.email({
    firstName: firstName,
    lastName: lastName,
  });

  return {
    id: faker.string.numeric({ length: 15 }),
    firstName,
    lastName,
    email,
    phone: formatPhone(
      faker.string.numeric({ length: 10, allowLeadingZeros: false }),
    ),
    gender,
    age: faker.number.int({ min: 18, max: 90 }),
  };
}

export const participants = Array.from({ length: 15 }, () =>
  createParticipant(),
).sort((a, b) => a.firstName.localeCompare(b.firstName));
