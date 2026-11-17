{
  description = "newtox.de Astro Flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_24
            pnpm
          ];

          shellHook = ''
            echo "🚀 newtox.de dev shell ready"
            echo "Node: $(node -v)"
            echo "pnpm: $(pnpm -v)"
          '';
        };
      });
}