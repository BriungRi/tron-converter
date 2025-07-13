with import <nixpkgs> { };

pkgs.mkShell {
  buildInputs = [
    nodejs_20
    nodePackages.pnpm
  ];
}