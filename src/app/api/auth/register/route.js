export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, photoURL, password } = body;

    // Validate required fields
    if (!name || !email || !password) {
      return Response.json(
        { message: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate password requirements
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasMinLength = password.length >= 6;

    if (!hasUppercase || !hasLowercase || !hasMinLength) {
      return Response.json(
        { message: "Password must contain uppercase, lowercase, and be at least 6 characters" },
        { status: 400 }
      );
    }

    // TODO: Connect to your database or backend service
    // Example: Save user to database, hash password, etc.
    console.log("Registration attempt:", { name, email, photoURL });

    // For now, return success (replace with actual database logic)
    return Response.json(
      { 
        message: "Registration successful",
        user: {
          name,
          email,
          photoURL,
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return Response.json(
      { message: "Something went wrong during registration" },
      { status: 500 }
    );
  }
}
