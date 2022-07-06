/// <reference types="@sveltejs/kit" />

import type { User } from '$lib/store/auth';
import type { Traveller } from '$lib/store/traveller';

declare global {
  declare namespace App {
    interface Locals {
      user?: User;
      travellerMe?: Traveller;
    }

    interface Session {
      user?: User;
      travellerMe?: Traveller;
    }
  }
}
